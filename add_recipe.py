#!/usr/bin/env python3
"""
Скрипт с удобным интерфейсом (Tkinter GUI / CLI fallback)
для быстрого добавления новых рецептов в src/data/recipes.ts и элементов в src/data/items.ts.
"""

import sys
import os
import re
import json
from typing import Dict, List, Tuple, Optional

# Пути к файлам данных относительно корня проекта
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ITEMS_TS_PATH = os.path.join(BASE_DIR, 'src', 'data', 'items.ts')
RECIPES_TS_PATH = os.path.join(BASE_DIR, 'src', 'data', 'recipes.ts')
RECIPES_JSON_PATH = os.path.join(BASE_DIR, 'src', 'data', 'recipes.json')

# Верстаки и их категории
WORKSTATIONS_DATA = {
    'weapons_bench': {
        'name': 'Оружейный стол',
        'categories': ['Оружейные обвесы', 'Оружие', 'Патроны']
    },
    'tech_bench': {
        'name': 'Технический стол',
        'categories': ['Электроника', 'Металлолом']
    },
    'chem_bench': {
        'name': 'Химический стол',
        'categories': ['Медицина', 'Реагенты и Нефтехимия', 'Полимеры']
    },
    'sewing_bench': {
        'name': 'Швейный стол',
        'categories': ['Рюкзаки', 'Кожа', 'Броня']
    }
}

# Профессии и их навыки
PROFESSIONS_DATA = {
    'technician': {
        'name': 'Техник',
        'skills': {
            'tech_basic': 'Базовые навыки',
            'tech_repair': 'Ремонт',
            'tech_devices': 'Устройства'
        }
    },
    'pharmacist': {
        'name': 'Фармацевт',
        'skills': {
            'bandages': 'Перевязочные материалы',
            'basic_meds': 'Базовые Медикаменты',
            'pills': 'Таблетки'
        }
    },
    'metallurgist': {
        'name': 'Металлург',
        'skills': {
            'steel_smelting': 'Плавка стали',
            'scrap_recycling': 'Переработка лома'
        }
    },
    'gunsmith': {
        'name': 'Оружейник',
        'skills': {
            'gun_fullsize': 'Полноразмерное оружие',
            'gun_compact': 'Компактное оружие',
            'gun_subcompact': 'Субкомпактное оружие',
            'gun_small': 'Малогабаритное оружие',
            'gun_manual_delta': 'Мануал Дельта',
            'gun_manual_omega': 'Мануал Омега',
            'gun_melee': 'Холодное оружие',
            'gun_parts': 'Оружейные детали',
            'gun_cleaning': 'Набор чистки',
            'gun_tools': 'Инструменты',
            'gun_ammo': 'Патроны',
            'gun_upgrade': 'Улучшение оружия',
            'gun_muzzle_brake': 'Модуль: Дульный тормоз',
            'gun_suppressor': 'Модуль: Глушитель',
            'gun_scope': 'Модуль: Прицел'
        }
    },
    'armorer': {
        'name': 'Бронник',
        'skills': {
            'leather_processing': 'Обработка кожи',
            'backpacks': 'Рюкзаки',
            'armor_plates': 'Бронепластины',
            'armor_vests': 'Создание бронежилетов',
            'armor_reinforcement': 'Армирование бронежилетов'
        }
    },
    'chemist': {
        'name': 'Химик',
        'skills': {
            'reagents_med': 'Реагенты: медицина',
            'reagents_gen': 'Реагенты: общие',
            'reagents_weapon': 'Реагенты: оружие',
            'reagents_plastic': 'Реагенты: пластик',
            'cloth_processing': 'Обработка ткани',
            'flares': 'Сигнальные ракеты',
            'oil_refining': 'Переработка нефти',
            'polymers': 'Полимеры',
            'glass': 'Стекло'
        }
    }
}

# Иконки предметов Lucide
POPULAR_ICONS = [
    'Box', 'FlaskConical', 'Droplet', 'Sparkles', 'Flame', 'Cpu', 'Layers',
    'Shield', 'Crosshair', 'Wrench', 'Scissors', 'Square'
]


def load_items() -> Dict[str, str]:
    """Считывает предметы из src/data/items.ts и возвращает словарь {id: name}."""
    items = {}
    if not os.path.exists(ITEMS_TS_PATH):
        return items

    with open(ITEMS_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r"([a-zA-Z0-9_]+):\s*\{\s*id:\s*['\"]([^'\"]+)['\"],\s*name:\s*['\"]([^'\"]+)['\"]"
    matches = re.findall(pattern, content)
    for key, item_id, item_name in matches:
        items[item_id] = item_name

    return items


def add_item_to_ts(item_id: str, item_name: str, icon: str = 'Box', is_base: bool = False) -> bool:
    """Добавляет новый предмет в src/data/items.ts, если его еще нет."""
    if not os.path.exists(ITEMS_TS_PATH):
        return False

    with open(ITEMS_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    if f"id: '{item_id}'" in content or f'id: "{item_id}"' in content:
        return True  # Уже существует

    last_brace_idx = content.rfind('};')
    if last_brace_idx == -1:
        return False

    is_base_str = 'true' if is_base else 'false'
    new_entry = f"  {item_id}: {{ id: '{item_id}', name: '{item_name}', icon: '{icon}', isBase: {is_base_str} }}"

    prefix = content[:last_brace_idx].rstrip()
    if not prefix.endswith(',') and not prefix.endswith('{'):
        prefix += ','
    prefix += '\n'

    new_content = prefix + new_entry + '\n' + content[last_brace_idx:]
    with open(ITEMS_TS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True


def load_existing_recipe_ids() -> List[str]:
    """Загружает ID всех имеющихся рецептов из recipes.ts."""
    if not os.path.exists(RECIPES_TS_PATH):
        return []

    with open(RECIPES_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r"id:\s*['\"]([^'\"]+)['\"]"
    return re.findall(pattern, content)


def save_recipe_to_ts(recipe_data: dict) -> bool:
    """
    Форматирует и добавляет рецепт в src/data/recipes.ts и recipes.json (если существует).
    """
    if not os.path.exists(RECIPES_TS_PATH):
        return False

    with open(RECIPES_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Генерация TypeScript объекта
    inputs_ts = "[\n" + ",\n".join(
        [f"      {{ itemId: '{inp['itemId']}', amount: {inp['amount']} }}" for inp in recipe_data['inputs']]
    ) + "\n    ]"

    outputs_ts = "[\n" + ",\n".join(
        [f"      {{ itemId: '{out['itemId']}', amount: {out['amount']} }}" for out in recipe_data['outputs']]
    ) + "\n    ]"

    skill_str = ""
    if recipe_data.get('requiredSkill'):
        req = recipe_data['requiredSkill']
        skill_str = f"\n    requiredSkill: {{ professionId: '{req['professionId']}', skillId: '{req['skillId']}', level: {req['level']} }},"

    exp_str = ""
    if recipe_data.get('expGiven') is not None:
        exp_str = f"\n    expGiven: {recipe_data['expGiven']}"

    ts_block = f"""  {{
    id: '{recipe_data['id']}',
    name: '{recipe_data['name']}',
    workstationId: '{recipe_data['workstationId']}',
    category: '{recipe_data['category']}',
    tier: {recipe_data['tier']},
    craftTimeSec: {recipe_data['craftTimeSec']},
    durabilityCost: {recipe_data['durabilityCost']},
    inputs: {inputs_ts},
    outputs: {outputs_ts},{skill_str}{exp_str}
  }}"""

    # Ищем закрывающий `];` массива RECIPES
    last_bracket_idx = content.rfind('];')
    if last_bracket_idx == -1:
        return False

    prefix = content[:last_bracket_idx].rstrip()
    if prefix.endswith('}'):
        prefix += ',\n'
    elif not prefix.endswith('\n'):
        prefix += '\n'

    new_content = prefix + ts_block + '\n];\n'

    with open(RECIPES_TS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    # Обновление recipes.json при наличии
    if os.path.exists(RECIPES_JSON_PATH):
        try:
            with open(RECIPES_JSON_PATH, 'r', encoding='utf-8') as f:
                json_data = json.load(f)

            json_entry = {
                "id": recipe_data['id'],
                "name": recipe_data['name'],
                "workstation_id": recipe_data['workstationId'],
                "category": recipe_data['category'],
                "tier": recipe_data['tier'],
                "craft_time_sec": recipe_data['craftTimeSec'],
                "durability_cost": recipe_data['durabilityCost'],
                "inputs": [{"item_id": i['itemId'], "amount": i['amount']} for i in recipe_data['inputs']],
                "outputs": [{"item_id": o['itemId'], "amount": o['amount']} for o in recipe_data['outputs']]
            }
            if recipe_data.get('requiredSkill'):
                req = recipe_data['requiredSkill']
                json_entry["required_skill"] = {
                    "profession_id": req['professionId'],
                    "skill_id": req['skillId'],
                    "level": req['level']
                }
            if recipe_data.get('expGiven') is not None:
                json_entry["exp_given"] = recipe_data['expGiven']

            json_data.append(json_entry)
            with open(RECIPES_JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, ensure_ascii=False, indent=4)
        except Exception as e:
            print(f"Предупреждение: не удалось обновить recipes.json: {e}")

    return True


# ==============================================================================
# GUI РЕАЛИЗАЦИЯ (Tkinter)
# ==============================================================================

def run_gui():
    import tkinter as tk
    from tkinter import ttk, messagebox

    items_dict = load_items()
    existing_ids = load_existing_recipe_ids()

    root = tk.Tk()
    root.title("Менеджер Рецептов - Крафтовый Калькулятор")
    root.geometry("850x750")
    root.minsize(750, 650)

    # Стили
    style = ttk.Style()
    style.theme_use('clam')

    main_frame = ttk.Frame(root, padding="15")
    main_frame.pack(fill=tk.BOTH, expand=True)

    # Прокручиваемая область
    canvas = tk.Canvas(main_frame, borderwidth=0, highlightthickness=0)
    scrollbar = ttk.Scrollbar(main_frame, orient="vertical", command=canvas.yview)
    scroll_frame = ttk.Frame(canvas, padding="5")

    scroll_frame.bind(
        "<Configure>",
        lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
    )
    canvas.create_window((0, 0), window=scroll_frame, anchor="nw")
    canvas.configure(yscrollcommand=scrollbar.set)

    canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    # Привязка колесика мыши
    def _on_mousewheel(event):
        canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")
    canvas.bind_all("<MouseWheel>", _on_mousewheel)

    # --------------------------------------------------------------------------
    # 1. ОСНОВНЫЕ ПАРАМЕТРЫ РЕЦЕПТА
    # --------------------------------------------------------------------------
    group_main = ttk.LabelFrame(scroll_frame, text=" Основные параметры ", padding="10")
    group_main.pack(fill=tk.X, expand=True, pady=5)

    # Верстак
    ttk.Label(group_main, text="Верстак:").grid(row=0, column=0, sticky=tk.W, pady=3)
    ws_ids = list(WORKSTATIONS_DATA.keys())
    ws_names = [WORKSTATIONS_DATA[w]['name'] for w in ws_ids]
    ws_combo = ttk.Combobox(group_main, values=ws_names, state="readonly", width=25)
    ws_combo.current(0)
    ws_combo.grid(row=0, column=1, sticky=tk.W, pady=3, padx=5)

    # Категория
    ttk.Label(group_main, text="Категория:").grid(row=0, column=2, sticky=tk.W, pady=3, padx=(15, 0))
    cat_combo = ttk.Combobox(group_main, state="readonly", width=25)
    cat_combo.grid(row=0, column=3, sticky=tk.W, pady=3, padx=5)

    def update_categories(*args):
        selected_ws_idx = ws_combo.current()
        if selected_ws_idx >= 0:
            ws_id = ws_ids[selected_ws_idx]
            categories = WORKSTATIONS_DATA[ws_id]['categories']
            cat_combo['values'] = categories
            cat_combo.current(0)

    ws_combo.bind("<<ComboboxSelected>>", update_categories)
    update_categories()

    # Тир
    ttk.Label(group_main, text="Тир (1-4):").grid(row=1, column=0, sticky=tk.W, pady=3)
    tier_combo = ttk.Combobox(group_main, values=[1, 2, 3, 4], state="readonly", width=10)
    tier_combo.current(0)
    tier_combo.grid(row=1, column=1, sticky=tk.W, pady=3, padx=5)

    # Время крафта и Прочность
    ttk.Label(group_main, text="Время (сек):").grid(row=1, column=2, sticky=tk.W, pady=3, padx=(15, 0))
    craft_time_entry = ttk.Entry(group_main, width=12)
    craft_time_entry.insert(0, "10")
    craft_time_entry.grid(row=1, column=3, sticky=tk.W, pady=3, padx=5)

    ttk.Label(group_main, text="Прочность верстака:").grid(row=2, column=0, sticky=tk.W, pady=3)
    durability_entry = ttk.Entry(group_main, width=12)
    durability_entry.insert(0, "1")
    durability_entry.grid(row=2, column=1, sticky=tk.W, pady=3, padx=5)

    # --------------------------------------------------------------------------
    # 2. РЕЗУЛЬТАТ КРАФТА (OUTPUTS) & ИМЯ/ID
    # --------------------------------------------------------------------------
    group_output = ttk.LabelFrame(scroll_frame, text=" Выходной предмет ", padding="10")
    group_output.pack(fill=tk.X, expand=True, pady=5)

    ttk.Label(group_output, text="Предмет на выходе:").grid(row=0, column=0, sticky=tk.W, pady=3)

    item_display_list = [f"{item_id} ({name})" for item_id, name in sorted(items_dict.items())]
    out_item_combo = ttk.Combobox(group_output, values=item_display_list, width=40)
    if item_display_list:
        out_item_combo.current(0)
    out_item_combo.grid(row=0, column=1, sticky=tk.W, pady=3, padx=5)

    # Кнопка добавления нового предмета в items.ts
    def open_add_item_dialog():
        dlg = tk.Toplevel(root)
        dlg.title("Добавить новый предмет в items.ts")
        dlg.geometry("400x300")
        dlg.transient(root)
        dlg.grab_set()

        ttk.Label(dlg, text="ID предмета (например: my_item):").pack(anchor=tk.W, padx=15, pady=(15, 2))
        id_ent = ttk.Entry(dlg, width=35)
        id_ent.pack(padx=15, pady=2)

        ttk.Label(dlg, text="Название (например: Мой Предмет):").pack(anchor=tk.W, padx=15, pady=(10, 2))
        name_ent = ttk.Entry(dlg, width=35)
        name_ent.pack(padx=15, pady=2)

        ttk.Label(dlg, text="Иконка Lucide:").pack(anchor=tk.W, padx=15, pady=(10, 2))
        icon_combo = ttk.Combobox(dlg, values=POPULAR_ICONS, width=32)
        icon_combo.current(0)
        icon_combo.pack(padx=15, pady=2)

        is_base_var = tk.BooleanVar(value=False)
        ttk.Checkbutton(dlg, text="Базовый ресурс (isBase)", variable=is_base_var).pack(anchor=tk.W, padx=15, pady=10)

        def save_new_item():
            new_id = id_ent.get().strip()
            new_name = name_ent.get().strip()
            new_icon = icon_combo.get().strip() or 'Box'
            if not new_id or not new_name:
                messagebox.showerror("Ошибка", "Заполните ID и название предмета!", parent=dlg)
                return

            if add_item_to_ts(new_id, new_name, new_icon, is_base_var.get()):
                items_dict[new_id] = new_name
                # Обновляем комбобоксы
                new_list = [f"{item_id} ({name})" for item_id, name in sorted(items_dict.items())]
                out_item_combo['values'] = new_list
                for row_widgets in input_rows:
                    row_widgets['combo']['values'] = new_list
                out_item_combo.set(f"{new_id} ({new_name})")
                messagebox.showinfo("Успех", f"Предмет {new_id} успешно добавлен!", parent=dlg)
                dlg.destroy()
            else:
                messagebox.showerror("Ошибка", "Не удалось записать предмет в items.ts", parent=dlg)

        ttk.Button(dlg, text="Добавить предмет", command=save_new_item).pack(pady=15)

    ttk.Button(group_output, text="+ Новый предмет", command=open_add_item_dialog).grid(row=0, column=2, padx=5, pady=3)

    ttk.Label(group_output, text="Количество:").grid(row=1, column=0, sticky=tk.W, pady=3)
    out_amount_entry = ttk.Entry(group_output, width=10)
    out_amount_entry.insert(0, "1")
    out_amount_entry.grid(row=1, column=1, sticky=tk.W, pady=3, padx=5)

    ttk.Label(group_output, text="Название рецепта:").grid(row=2, column=0, sticky=tk.W, pady=3)
    recipe_name_entry = ttk.Entry(group_output, width=45)
    recipe_name_entry.grid(row=2, column=1, columnspan=2, sticky=tk.W, pady=3, padx=5)

    ttk.Label(group_output, text="ID рецепта:").grid(row=3, column=0, sticky=tk.W, pady=3)
    recipe_id_entry = ttk.Entry(group_output, width=45)
    recipe_id_entry.grid(row=3, column=1, columnspan=2, sticky=tk.W, pady=3, padx=5)

    def auto_fill_name_and_id(*args):
        val = out_item_combo.get().strip()
        if not val:
            return
        selected_id = val.split(" ")[0]
        selected_name = items_dict.get(selected_id, selected_id)
        amt = out_amount_entry.get().strip() or "1"
        tier = tier_combo.get() or "1"

        gen_name = f"{selected_name} x{amt} (T{tier})"
        gen_id = f"recipe_{selected_id}_t{tier}"

        recipe_name_entry.delete(0, tk.END)
        recipe_name_entry.insert(0, gen_name)

        recipe_id_entry.delete(0, tk.END)
        recipe_id_entry.insert(0, gen_id)

    out_item_combo.bind("<<ComboboxSelected>>", auto_fill_name_and_id)
    tier_combo.bind("<<ComboboxSelected>>", auto_fill_name_and_id)

    # --------------------------------------------------------------------------
    # 3. ВХОДНЫЕ ИНГРЕДИЕНТЫ (INPUTS)
    # --------------------------------------------------------------------------
    group_inputs = ttk.LabelFrame(scroll_frame, text=" Входные ингредиенты ", padding="10")
    group_inputs.pack(fill=tk.X, expand=True, pady=5)

    input_rows = []
    inputs_frame = ttk.Frame(group_inputs)
    inputs_frame.pack(fill=tk.X, expand=True)

    def add_input_row(item_id: str = "", amount: int = 1):
        row_frame = ttk.Frame(inputs_frame)
        row_frame.pack(fill=tk.X, pady=2)

        ttk.Label(row_frame, text="Предмет:").pack(side=tk.LEFT, padx=(0, 5))
        combo = ttk.Combobox(row_frame, values=item_display_list, width=35)
        combo.pack(side=tk.LEFT, padx=5)

        if item_id in items_dict:
            combo.set(f"{item_id} ({items_dict[item_id]})")
        elif item_display_list:
            combo.current(0)

        ttk.Label(row_frame, text="Кол-во:").pack(side=tk.LEFT, padx=(10, 5))
        amt_ent = ttk.Entry(row_frame, width=8)
        amt_ent.insert(0, str(amount))
        amt_ent.pack(side=tk.LEFT, padx=5)

        row_data = {'frame': row_frame, 'combo': combo, 'entry': amt_ent}

        def remove_row():
            row_frame.destroy()
            if row_data in input_rows:
                input_rows.remove(row_data)

        btn_del = ttk.Button(row_frame, text="✕", width=3, command=remove_row)
        btn_del.pack(side=tk.LEFT, padx=5)

        input_rows.append(row_data)

    ttk.Button(group_inputs, text="+ Добавить ингредиент", command=lambda: add_input_row()).pack(anchor=tk.W, pady=5)
    # Инициализируем хотя бы 1 строку
    add_input_row()

    # --------------------------------------------------------------------------
    # 4. ТРЕБУЕМЫЙ НАВЫК И ОПЫТ (REQUIRED SKILL & EXP)
    # --------------------------------------------------------------------------
    group_skill = ttk.LabelFrame(scroll_frame, text=" Навыки и Опыт (опционально) ", padding="10")
    group_skill.pack(fill=tk.X, expand=True, pady=5)

    has_skill_var = tk.BooleanVar(value=False)
    chk_skill = ttk.Checkbutton(group_skill, text="Требуется навык профессии", variable=has_skill_var)
    chk_skill.grid(row=0, column=0, columnspan=2, sticky=tk.W, pady=3)

    prof_ids = list(PROFESSIONS_DATA.keys())
    prof_names = [PROFESSIONS_DATA[p]['name'] for p in prof_ids]

    ttk.Label(group_skill, text="Профессия:").grid(row=1, column=0, sticky=tk.W, pady=3)
    prof_combo = ttk.Combobox(group_skill, values=prof_names, state="readonly", width=20)
    prof_combo.grid(row=1, column=1, sticky=tk.W, pady=3, padx=5)

    ttk.Label(group_skill, text="Навык:").grid(row=1, column=2, sticky=tk.W, pady=3, padx=(15, 0))
    skill_combo = ttk.Combobox(group_skill, state="readonly", width=25)
    skill_combo.grid(row=1, column=3, sticky=tk.W, pady=3, padx=5)

    ttk.Label(group_skill, text="Уровень (1-4):").grid(row=2, column=0, sticky=tk.W, pady=3)
    skill_lvl_spin = ttk.Spinbox(group_skill, from_=1, to=4, width=5)
    skill_lvl_spin.set(1)
    skill_lvl_spin.grid(row=2, column=1, sticky=tk.W, pady=3, padx=5)

    ttk.Label(group_skill, text="Опыт (expGiven):").grid(row=2, column=2, sticky=tk.W, pady=3, padx=(15, 0))
    exp_entry = ttk.Entry(group_skill, width=10)
    exp_entry.grid(row=2, column=3, sticky=tk.W, pady=3, padx=5)

    def update_skills(*args):
        p_idx = prof_combo.current()
        if p_idx >= 0:
            p_id = prof_ids[p_idx]
            skills_map = PROFESSIONS_DATA[p_id]['skills']
            skill_combo['values'] = list(skills_map.values())
            if skills_map:
                skill_combo.current(0)

    prof_combo.bind("<<ComboboxSelected>>", update_skills)

    if prof_names:
        prof_combo.current(0)
        update_skills()

    # --------------------------------------------------------------------------
    # 5. КНОПКА СОХРАНЕНИЯ
    # --------------------------------------------------------------------------
    def save_recipe():
        r_id = recipe_id_entry.get().strip()
        r_name = recipe_name_entry.get().strip()
        if not r_id or not r_name:
            messagebox.showerror("Ошибка", "Укажите ID и название рецепта!")
            return

        if r_id in existing_ids:
            if not messagebox.askyesno("Предупреждение", f"Рецепт с ID '{r_id}' уже существует. Добавить всё равно?"):
                return

        ws_idx = ws_combo.current()
        ws_id = ws_ids[ws_idx]
        category = cat_combo.get()
        tier = int(tier_combo.get())

        try:
            craft_time = float(craft_time_entry.get().replace(',', '.'))
            durability = float(durability_entry.get().replace(',', '.'))
        except ValueError:
            messagebox.showerror("Ошибка", "Время и прочность должны быть числами!")
            return

        # Выходной предмет
        out_val = out_item_combo.get().strip()
        if not out_val:
            messagebox.showerror("Ошибка", "Выберите выходной предмет!")
            return
        out_item_id = out_val.split(" ")[0]

        try:
            out_amount = int(out_amount_entry.get())
        except ValueError:
            messagebox.showerror("Ошибка", "Количество на выходе должно быть целым числом!")
            return

        outputs = [{'itemId': out_item_id, 'amount': out_amount}]

        # Входные ингредиенты
        inputs = []
        for row in input_rows:
            inp_val = row['combo'].get().strip()
            if not inp_val:
                continue
            inp_item_id = inp_val.split(" ")[0]
            try:
                inp_amt = float(row['entry'].get().replace(',', '.'))
                # Переводим в int если это целое число
                if inp_amt.is_integer():
                    inp_amt = int(inp_amt)
            except ValueError:
                messagebox.showerror("Ошибка", f"Некорректное количество для ингредиента '{inp_item_id}'")
                return
            inputs.append({'itemId': inp_item_id, 'amount': inp_amt})

        if not inputs:
            messagebox.showerror("Ошибка", "Добавьте хотя бы один входной ингредиент!")
            return

        recipe_data = {
            'id': r_id,
            'name': r_name,
            'workstationId': ws_id,
            'category': category,
            'tier': tier,
            'craftTimeSec': int(craft_time) if craft_time.is_integer() else craft_time,
            'durabilityCost': int(durability) if durability.is_integer() else durability,
            'inputs': inputs,
            'outputs': outputs
        }

        if has_skill_var.get():
            p_idx = prof_combo.current()
            p_id = prof_ids[p_idx]
            skills_map = PROFESSIONS_DATA[p_id]['skills']

            # Ищем skillId по выбранному русскому названию
            selected_skill_name = skill_combo.get()
            s_id = None
            for sk_id, sk_name in skills_map.items():
                if sk_name == selected_skill_name:
                    s_id = sk_id
                    break

            if s_id:
                try:
                    s_lvl = int(skill_lvl_spin.get())
                except ValueError:
                    s_lvl = 1
                recipe_data['requiredSkill'] = {
                    'professionId': p_id,
                    'skillId': s_id,
                    'level': s_lvl
                }

        exp_val = exp_entry.get().strip()
        if exp_val:
            try:
                exp_num = float(exp_val.replace(',', '.'))
                recipe_data['expGiven'] = int(exp_num) if exp_num.is_integer() else exp_num
            except ValueError:
                pass

        if save_recipe_to_ts(recipe_data):
            existing_ids.append(r_id)
            messagebox.showinfo("Успех", f"Рецепт '{r_name}' успешно сохранен в recipes.ts!")
        else:
            messagebox.showerror("Ошибка", "Не удалось записать рецепт в файл.")

    btn_save = ttk.Button(scroll_frame, text=" СОХРАНИТЬ РЕЦЕПТ ", command=save_recipe)
    btn_save.pack(pady=20, ipadx=15, ipady=5)

    root.mainloop()


# ==============================================================================
# CLI РЕАЛИЗАЦИЯ (Фоллбэк для консольного режима без DISPLAY)
# ==============================================================================

def run_cli():
    print("=" * 60)
    print("      МЕНЕДЖЕР РЕЦЕПТОВ (Консольный режим)      ")
    print("=" * 60)

    items_dict = load_items()
    existing_ids = load_existing_recipe_ids()

    print("\n1. Выбор верстака:")
    ws_ids = list(WORKSTATIONS_DATA.keys())
    for idx, w_id in enumerate(ws_ids, 1):
        print(f"  {idx}. {WORKSTATIONS_DATA[w_id]['name']} ({w_id})")

    while True:
        try:
            choice = int(input("Введите номер верстака [1-4]: "))
            if 1 <= choice <= len(ws_ids):
                selected_ws_id = ws_ids[choice - 1]
                break
        except ValueError:
            pass
        print("Неверный выбор, попробуйте еще раз.")

    categories = WORKSTATIONS_DATA[selected_ws_id]['categories']
    print("\n2. Выбор категории:")
    for idx, cat in enumerate(categories, 1):
        print(f"  {idx}. {cat}")

    while True:
        try:
            choice = int(input(f"Введите номер категории [1-{len(categories)}]: "))
            if 1 <= choice <= len(categories):
                selected_category = categories[choice - 1]
                break
        except ValueError:
            pass

    print("\n3. Укажите тир рецепта (1, 2, 3, 4):")
    tier = 1
    while True:
        try:
            t = int(input("Тир [1-4] (по умолчанию 1): ") or "1")
            if 1 <= t <= 4:
                tier = t
                break
        except ValueError:
            pass

    print("\n4. Выходной предмет (выберите существующий или введите новый):")
    out_item_id = input("ID выходного предмета (например: plate_class_1a): ").strip()
    if out_item_id not in items_dict:
        print(f"Предмет '{out_item_id}' не найден в items.ts.")
        add_new = input("Добавить его в items.ts? (y/n): ").strip().lower()
        if add_new == 'y':
            item_name = input("Название предмета на русском: ").strip()
            add_item_to_ts(out_item_id, item_name)
            items_dict[out_item_id] = item_name

    out_amount = int(input("Количество на выходе [1]: ") or "1")

    item_name = items_dict.get(out_item_id, out_item_id)
    default_recipe_name = f"{item_name} x{out_amount} (T{tier})"
    default_recipe_id = f"recipe_{out_item_id}_t{tier}"

    recipe_name = input(f"Название рецепта [{default_recipe_name}]: ").strip() or default_recipe_name
    recipe_id = input(f"ID рецепта [{default_recipe_id}]: ").strip() or default_recipe_id

    craft_time = float(input("Время крафта в секундах [10]: ") or "10")
    durability = float(input("Прочность верстака [1]: ") or "1")

    print("\n5. Входные ингредиенты (вводите ID предмета и количество, пустой ID - завершение):")
    inputs = []
    while True:
        inp_id = input("  ID ингредиента (или Enter для завершения): ").strip()
        if not inp_id:
            if not inputs:
                print("  Нужен хотя бы один ингредиент!")
                continue
            break

        if inp_id not in items_dict:
            print(f"  Внимание: '{inp_id}' отсутствует в items.ts.")
            add_i = input("  Добавить в items.ts? (y/n): ").strip().lower()
            if add_i == 'y':
                i_name = input("  Название ингредиента: ").strip()
                add_item_to_ts(inp_id, i_name)
                items_dict[inp_id] = i_name

        amt_str = input(f"  Количество {inp_id} [1]: ") or "1"
        amt_num = float(amt_str.replace(',', '.'))
        if amt_num.is_integer():
            amt_num = int(amt_num)
        inputs.append({'itemId': inp_id, 'amount': amt_num})

    recipe_data = {
        'id': recipe_id,
        'name': recipe_name,
        'workstationId': selected_ws_id,
        'category': selected_category,
        'tier': tier,
        'craftTimeSec': int(craft_time) if craft_time.is_integer() else craft_time,
        'durabilityCost': int(durability) if durability.is_integer() else durability,
        'inputs': inputs,
        'outputs': [{'itemId': out_item_id, 'amount': out_amount}]
    }

    req_skill = input("\nТребуется ли навык профессии? (y/n) [n]: ").strip().lower()
    if req_skill == 'y':
        print("Профессии:")
        p_ids = list(PROFESSIONS_DATA.keys())
        for idx, p_id in enumerate(p_ids, 1):
            print(f"  {idx}. {PROFESSIONS_DATA[p_id]['name']} ({p_id})")
        p_choice = int(input("Выберите профессию: ") or "1")
        selected_p_id = p_ids[p_choice - 1]

        skills_map = PROFESSIONS_DATA[selected_p_id]['skills']
        print("Навыки:")
        s_ids = list(skills_map.keys())
        for idx, s_id in enumerate(s_ids, 1):
            print(f"  {idx}. {skills_map[s_id]} ({s_id})")
        s_choice = int(input("Выберите навык: ") or "1")
        selected_s_id = s_ids[s_choice - 1]

        s_lvl = int(input("Уровень навыка (1-4) [1]: ") or "1")
        recipe_data['requiredSkill'] = {
            'professionId': selected_p_id,
            'skillId': selected_s_id,
            'level': s_lvl
        }

    exp_val = input("Количество опыта expGiven (например 2, или Enter чтоб пропустить): ").strip()
    if exp_val:
        e_num = float(exp_val.replace(',', '.'))
        recipe_data['expGiven'] = int(e_num) if e_num.is_integer() else e_num

    print("\nСохранение рецепта...")
    if save_recipe_to_ts(recipe_data):
        print(f"УСПЕХ! Рецепт '{recipe_name}' добавлен в recipes.ts")
    else:
        print("ОШИБКА: Не удалось добавить рецепт.")


if __name__ == '__main__':
    # Если запущен с аргументом --cli или GUI недоступен (например в headless), запускаем CLI
    if '--cli' in sys.argv:
        run_cli()
    else:
        try:
            import tkinter as tk
            # Проверяем возможность инициализации дисплея
            root = tk.Tk()
            root.destroy()
            run_gui()
        except Exception as e:
            print(f"Графический интерфейс недоступен ({e}). Переключение в CLI режим...")
            run_cli()
