#!/usr/bin/env python3
"""
Скрипт с современным визуальным интерфейсом (Tkinter GUI / CLI fallback)
для добавления/редактирования предметов в src/data/items.ts
и быстрого создания рецептов в src/data/recipes.ts.
"""

import sys
import os
import re
import json
from typing import Dict, List, Tuple, Optional, Any

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

POPULAR_ICONS = [
    'Box', 'FlaskConical', 'Droplet', 'Sparkles', 'Flame', 'Cpu', 'Layers',
    'Shield', 'Crosshair', 'Wrench', 'Scissors', 'Square'
]


# ==============================================================================
# РАБОТА С ФАЙЛАМИ ДАННЫХ
# ==============================================================================

def load_items_full() -> Dict[str, dict]:
    """
    Считывает все предметы из src/data/items.ts со всеми деталями (id, name, icon, isBase).
    """
    items = {}
    if not os.path.exists(ITEMS_TS_PATH):
        return items

    with open(ITEMS_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r"([a-zA-Z0-9_]+):\s*\{\s*id:\s*['\"]([^'\"]+)['\"],\s*name:\s*['\"]([^'\"]+)['\"],\s*icon:\s*['\"]([^'\"]+)['\"],\s*isBase:\s*(true|false)"
    matches = re.findall(pattern, content)
    for key, item_id, item_name, icon, is_base_str in matches:
        items[item_id] = {
            'id': item_id,
            'name': item_name,
            'icon': icon,
            'isBase': is_base_str.lower() == 'true'
        }

    return items


def add_item_to_ts(item_id: str, item_name: str, icon: str = 'Box', is_base: bool = False) -> bool:
    """Добавляет новый предмет в src/data/items.ts."""
    if not os.path.exists(ITEMS_TS_PATH):
        return False

    with open(ITEMS_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    if f"id: '{item_id}'" in content or f'id: "{item_id}"' in content:
        return True

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


def update_item_in_ts(item_id: str, new_name: str, new_icon: str, new_is_base: bool) -> bool:
    """Обновляет параметры существующего предмета в src/data/items.ts."""
    if not os.path.exists(ITEMS_TS_PATH):
        return False

    with open(ITEMS_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    is_base_str = 'true' if new_is_base else 'false'
    pattern = rf"({item_id}:\s*\{{\s*id:\s*['\"]{item_id}['\"],)([^}}]+)(\}})"

    if not re.search(pattern, content):
        return False

    replacement = f"\\1 name: '{new_name}', icon: '{new_icon}', isBase: {is_base_str} \\3"
    new_content = re.sub(pattern, replacement, content)

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
    """Форматирует и добавляет новый рецепт в recipes.ts и recipes.json."""
    if not os.path.exists(RECIPES_TS_PATH):
        return False

    with open(RECIPES_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

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

    # Обновление JSON файла, если существует
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
# GUI РЕАЛИЗАЦИЯ (Tkinter СОВРЕМЕННЫЙ ИНТЕРФЕЙС)
# ==============================================================================

def open_item_picker_dialog(parent, items_dict: Dict[str, dict], callback, title="Выбор предмета"):
    """
    Модальное окно для удобного поиска и выбора предмета с фильтрацией на лету.
    """
    import tkinter as tk
    from tkinter import ttk

    dlg = tk.Toplevel(parent)
    dlg.title(title)
    dlg.geometry("550x500")
    dlg.transient(parent)
    dlg.grab_set()

    # Стилизация
    top_frame = ttk.Frame(dlg, padding="10")
    top_frame.pack(fill=tk.X)

    ttk.Label(top_frame, text="🔍 Поиск предмета:", font=('Segoe UI', 10, 'bold')).pack(anchor=tk.W, pady=(0, 5))

    search_var = tk.StringVar()
    search_entry = ttk.Entry(top_frame, textvariable=search_var, font=('Segoe UI', 10))
    search_entry.pack(fill=tk.X, pady=(0, 8))
    search_entry.focus_set()

    filter_type_var = tk.StringVar(value="all")
    filter_frame = ttk.Frame(top_frame)
    filter_frame.pack(fill=tk.X)

    ttk.Radiobutton(filter_frame, text="Все", variable=filter_type_var, value="all").pack(side=tk.LEFT, padx=(0, 10))
    ttk.Radiobutton(filter_frame, text="Базовые", variable=filter_type_var, value="base").pack(side=tk.LEFT, padx=10)
    ttk.Radiobutton(filter_frame, text="Крафтовые", variable=filter_type_var, value="craft").pack(side=tk.LEFT, padx=10)

    # Список предметов
    list_frame = ttk.Frame(dlg, padding="10 0 10 10")
    list_frame.pack(fill=tk.BOTH, expand=True)

    scrollbar = ttk.Scrollbar(list_frame)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    listbox = tk.Listbox(
        list_frame,
        yscrollcommand=scrollbar.set,
        font=('Consolas', 10),
        selectmode=tk.SINGLE,
        activestyle='none',
        highlightthickness=1
    )
    listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
    scrollbar.config(command=listbox.yview)

    displayed_item_ids = []

    def refresh_list(*args):
        listbox.delete(0, tk.END)
        displayed_item_ids.clear()

        query = search_var.get().strip().lower()
        f_type = filter_type_var.get()

        for item_id, item_info in sorted(items_dict.items(), key=lambda x: x[1]['name']):
            is_base = item_info['isBase']
            if f_type == 'base' and not is_base:
                continue
            if f_type == 'craft' and is_base:
                continue

            name = item_info['name']
            tag = "[Базовый]  " if is_base else "[Крафтовый]"

            if not query or query in item_id.lower() or query in name.lower():
                displayed_item_ids.append(item_id)
                listbox.insert(tk.END, f"{tag:<12} {name} ({item_id})")

        if displayed_item_ids:
            listbox.selection_set(0)

    search_var.trace_add("write", refresh_list)
    filter_type_var.trace_add("write", refresh_list)
    refresh_list()

    def confirm_selection(event=None):
        sel = listbox.curselection()
        if sel and sel[0] < len(displayed_item_ids):
            chosen_id = displayed_item_ids[sel[0]]
            callback(chosen_id)
            dlg.destroy()

    listbox.bind("<Double-1>", confirm_selection)
    listbox.bind("<Return>", confirm_selection)

    btn_frame = ttk.Frame(dlg, padding="10")
    btn_frame.pack(fill=tk.X)
    ttk.Button(btn_frame, text=" Выбрать ", command=confirm_selection).pack(side=tk.RIGHT, padx=5)
    ttk.Button(btn_frame, text=" Отмена ", command=dlg.destroy).pack(side=tk.RIGHT)


def open_item_manager_dialog(parent, items_dict: Dict[str, dict], on_items_updated):
    """
    Модальное окно для полного управления предметами (просмотр, редактирование существующего, создание нового).
    """
    import tkinter as tk
    from tkinter import ttk, messagebox

    dlg = tk.Toplevel(parent)
    dlg.title("Управление Предметами (src/data/items.ts)")
    dlg.geometry("650x550")
    dlg.transient(parent)
    dlg.grab_set()

    # Левая панель - список и поиск
    left_frame = ttk.Frame(dlg, padding="10")
    left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

    ttk.Label(left_frame, text="🔍 Поиск:", font=('Segoe UI', 9, 'bold')).pack(anchor=tk.W)
    search_var = tk.StringVar()
    ttk.Entry(left_frame, textvariable=search_var).pack(fill=tk.X, pady=(2, 5))

    listbox_frame = ttk.Frame(left_frame)
    listbox_frame.pack(fill=tk.BOTH, expand=True)

    sb = ttk.Scrollbar(listbox_frame)
    sb.pack(side=tk.RIGHT, fill=tk.Y)

    item_listbox = tk.Listbox(listbox_frame, yscrollcommand=sb.set, font=('Segoe UI', 9))
    item_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
    sb.config(command=item_listbox.yview)

    displayed_ids = []

    def populate_items(*args):
        item_listbox.delete(0, tk.END)
        displayed_ids.clear()
        q = search_var.get().strip().lower()

        for i_id, info in sorted(items_dict.items(), key=lambda x: x[1]['name']):
            if not q or q in i_id.lower() or q in info['name'].lower():
                displayed_ids.append(i_id)
                tag = "⚡" if info['isBase'] else "🛠️"
                item_listbox.insert(tk.END, f"{tag} {info['name']} ({i_id})")

    search_var.trace_add("write", populate_items)
    populate_items()

    # Правая панель - редактирование / добавление
    right_frame = ttk.LabelFrame(dlg, text=" Свойства предмета ", padding="15")
    right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=10, pady=10)

    ttk.Label(right_frame, text="ID предмета:").grid(row=0, column=0, sticky=tk.W, pady=5)
    id_entry = ttk.Entry(right_frame, width=25)
    id_entry.grid(row=0, column=1, sticky=tk.W, pady=5)

    ttk.Label(right_frame, text="Название:").grid(row=1, column=0, sticky=tk.W, pady=5)
    name_entry = ttk.Entry(right_frame, width=25)
    name_entry.grid(row=1, column=1, sticky=tk.W, pady=5)

    ttk.Label(right_frame, text="Иконка (Lucide):").grid(row=2, column=0, sticky=tk.W, pady=5)
    icon_combo = ttk.Combobox(right_frame, values=POPULAR_ICONS, width=23)
    icon_combo.grid(row=2, column=1, sticky=tk.W, pady=5)

    is_base_var = tk.BooleanVar(value=False)
    ttk.Checkbutton(right_frame, text="Базовый ресурс (isBase)", variable=is_base_var).grid(row=3, column=0, columnspan=2, sticky=tk.W, pady=10)

    mode_var = tk.StringVar(value="edit")  # 'edit' или 'add'

    def on_select_item(event=None):
        sel = item_listbox.curselection()
        if not sel:
            return
        item_id = displayed_ids[sel[0]]
        info = items_dict[item_id]

        mode_var.set("edit")
        id_entry.delete(0, tk.END)
        id_entry.insert(0, info['id'])
        id_entry.config(state="disabled")  # ID менять нельзя

        name_entry.delete(0, tk.END)
        name_entry.insert(0, info['name'])

        icon_combo.set(info['icon'])
        is_base_var.set(info['isBase'])

    item_listbox.bind("<<ListboxSelect>>", on_select_item)

    def switch_to_add():
        mode_var.set("add")
        id_entry.config(state="normal")
        id_entry.delete(0, tk.END)
        name_entry.delete(0, tk.END)
        icon_combo.set('Box')
        is_base_var.set(False)
        id_entry.focus_set()

    btn_add_mode = ttk.Button(right_frame, text="+ Режим создания нового", command=switch_to_add)
    btn_add_mode.grid(row=4, column=0, columnspan=2, sticky=tk.EW, pady=(15, 5))

    def save_item_changes():
        current_id = id_entry.get().strip()
        new_name = name_entry.get().strip()
        new_icon = icon_combo.get().strip() or 'Box'
        new_is_base = is_base_var.get()

        if not current_id or not new_name:
            messagebox.showerror("Ошибка", "Заполните ID и название предмета!", parent=dlg)
            return

        if mode_var.get() == "edit":
            if update_item_in_ts(current_id, new_name, new_icon, new_is_base):
                items_dict[current_id] = {
                    'id': current_id,
                    'name': new_name,
                    'icon': new_icon,
                    'isBase': new_is_base
                }
                populate_items()
                on_items_updated()
                messagebox.showinfo("Успех", f"Предмет '{current_id}' успешно обновлен!", parent=dlg)
            else:
                messagebox.showerror("Ошибка", "Не удалось обновить предмет в items.ts", parent=dlg)
        else:
            if add_item_to_ts(current_id, new_name, new_icon, new_is_base):
                items_dict[current_id] = {
                    'id': current_id,
                    'name': new_name,
                    'icon': new_icon,
                    'isBase': new_is_base
                }
                populate_items()
                on_items_updated()
                messagebox.showinfo("Успех", f"Предмет '{current_id}' успешно создан!", parent=dlg)
                # Переключаемся в режим редактирования созданного
                mode_var.set("edit")
                id_entry.config(state="disabled")
            else:
                messagebox.showerror("Ошибка", "Не удалось добавить предмет в items.ts", parent=dlg)

    btn_save = ttk.Button(right_frame, text=" Сохранить изменения ", command=save_item_changes)
    btn_save.grid(row=5, column=0, columnspan=2, sticky=tk.EW, pady=5)


def run_gui():
    import tkinter as tk
    from tkinter import ttk, messagebox

    items_dict = load_items_full()
    existing_ids = load_existing_recipe_ids()

    root = tk.Tk()
    root.title("Крафтовый Калькулятор — Менеджер Рецептов & Предметов")
    root.geometry("900x800")
    root.minsize(800, 700)

    # Приятная цветовая тема
    style = ttk.Style()
    style.theme_use('clam')

    BG_DARK = '#0F172A'
    HEADER_BG = '#1E293B'
    PRIMARY_BLUE = '#2563EB'

    style.configure('.', font=('Segoe UI', 9))
    style.configure('TLabelframe', background='#FFFFFF', padding=12)
    style.configure('TLabelframe.Label', font=('Segoe UI', 10, 'bold'), foreground='#1E293B')
    style.configure('TButton', font=('Segoe UI', 9, 'bold'), padding=5)
    style.configure('Header.TFrame', background=HEADER_BG)
    style.configure('Header.TLabel', background=HEADER_BG, foreground='#FFFFFF', font=('Segoe UI', 14, 'bold'))

    # Верхний заголовок
    header_frame = ttk.Frame(root, style='Header.TFrame', padding="15 10")
    header_frame.pack(fill=tk.X)

    ttk.Label(header_frame, text="🛠️ Менеджер Рецептов и Предметов", style='Header.TLabel').pack(side=tk.LEFT)

    # Кнопка Управление предметами в заголовке
    def open_items_manager():
        open_item_manager_dialog(root, items_dict, on_items_refreshed)

    btn_items_mgr = ttk.Button(header_frame, text="📦 Управление Предметами", command=open_items_manager)
    btn_items_mgr.pack(side=tk.RIGHT)

    main_frame = ttk.Frame(root, padding="15")
    main_frame.pack(fill=tk.BOTH, expand=True)

    # Прокручиваемый контент
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

    def _on_mousewheel(event):
        canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")
    canvas.bind_all("<MouseWheel>", _on_mousewheel)

    # --------------------------------------------------------------------------
    # 1. ОСНОВНЫЕ ПАРАМЕТРЫ РЕЦЕПТА
    # --------------------------------------------------------------------------
    group_main = ttk.LabelFrame(scroll_frame, text=" 1. Основные параметры верстака ", padding="10")
    group_main.pack(fill=tk.X, expand=True, pady=5)

    ttk.Label(group_main, text="Верстак:").grid(row=0, column=0, sticky=tk.W, pady=4)
    ws_ids = list(WORKSTATIONS_DATA.keys())
    ws_names = [WORKSTATIONS_DATA[w]['name'] for w in ws_ids]
    ws_combo = ttk.Combobox(group_main, values=ws_names, state="readonly", width=25)
    ws_combo.current(0)
    ws_combo.grid(row=0, column=1, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_main, text="Категория:").grid(row=0, column=2, sticky=tk.W, pady=4, padx=(15, 0))
    cat_combo = ttk.Combobox(group_main, state="readonly", width=25)
    cat_combo.grid(row=0, column=3, sticky=tk.W, pady=4, padx=5)

    def update_categories(*args):
        selected_ws_idx = ws_combo.current()
        if selected_ws_idx >= 0:
            ws_id = ws_ids[selected_ws_idx]
            categories = WORKSTATIONS_DATA[ws_id]['categories']
            cat_combo['values'] = categories
            cat_combo.current(0)

    ws_combo.bind("<<ComboboxSelected>>", update_categories)
    update_categories()

    ttk.Label(group_main, text="Тир (1-4):").grid(row=1, column=0, sticky=tk.W, pady=4)
    tier_combo = ttk.Combobox(group_main, values=[1, 2, 3, 4], state="readonly", width=10)
    tier_combo.current(0)
    tier_combo.grid(row=1, column=1, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_main, text="Время крафта (сек):").grid(row=1, column=2, sticky=tk.W, pady=4, padx=(15, 0))
    craft_time_entry = ttk.Entry(group_main, width=12)
    craft_time_entry.insert(0, "10")
    craft_time_entry.grid(row=1, column=3, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_main, text="Прочность верстака:").grid(row=2, column=0, sticky=tk.W, pady=4)
    durability_entry = ttk.Entry(group_main, width=12)
    durability_entry.insert(0, "1")
    durability_entry.grid(row=2, column=1, sticky=tk.W, pady=4, padx=5)

    # --------------------------------------------------------------------------
    # 2. ВЫХОДНОЙ ПРЕДМЕТ (OUTPUT) & ИМЯ/ID
    # --------------------------------------------------------------------------
    group_output = ttk.LabelFrame(scroll_frame, text=" 2. Выходной результат крафта ", padding="10")
    group_output.pack(fill=tk.X, expand=True, pady=5)

    ttk.Label(group_output, text="Предмет на выходе:").grid(row=0, column=0, sticky=tk.W, pady=4)

    out_item_id_var = tk.StringVar()
    out_item_label_var = tk.StringVar(value="[ Не выбран ]")

    lbl_selected_out = ttk.Label(group_output, textvariable=out_item_label_var, font=('Segoe UI', 9, 'bold'), foreground='#2563EB')
    lbl_selected_out.grid(row=0, column=1, sticky=tk.W, pady=4, padx=5)

    def select_output_item():
        def on_picked(item_id):
            out_item_id_var.set(item_id)
            info = items_dict.get(item_id, {'name': item_id, 'isBase': False})
            tag = "⚡ [Базовый]" if info['isBase'] else "🛠️ [Крафтовый]"
            out_item_label_var.set(f"{tag} {info['name']} ({item_id})")
            auto_fill_name_and_id()

        open_item_picker_dialog(root, items_dict, on_picked, title="Выбор предмет на выходе")

    ttk.Button(group_output, text="🔍 Поиск предмета...", command=select_output_item).grid(row=0, column=2, padx=5, pady=4)

    # Выбираем по умолчанию первый предмет из словаря
    if items_dict:
        first_id = sorted(items_dict.keys())[0]
        out_item_id_var.set(first_id)
        f_info = items_dict[first_id]
        f_tag = "⚡ [Базовый]" if f_info['isBase'] else "🛠️ [Крафтовый]"
        out_item_label_var.set(f"{f_tag} {f_info['name']} ({first_id})")

    ttk.Label(group_output, text="Количество:").grid(row=1, column=0, sticky=tk.W, pady=4)
    out_amount_entry = ttk.Entry(group_output, width=10)
    out_amount_entry.insert(0, "1")
    out_amount_entry.grid(row=1, column=1, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_output, text="Название рецепта:").grid(row=2, column=0, sticky=tk.W, pady=4)
    recipe_name_entry = ttk.Entry(group_output, width=50)
    recipe_name_entry.grid(row=2, column=1, columnspan=2, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_output, text="ID рецепта:").grid(row=3, column=0, sticky=tk.W, pady=4)
    recipe_id_entry = ttk.Entry(group_output, width=50)
    recipe_id_entry.grid(row=3, column=1, columnspan=2, sticky=tk.W, pady=4, padx=5)

    def auto_fill_name_and_id(*args):
        selected_id = out_item_id_var.get()
        if not selected_id:
            return
        selected_name = items_dict.get(selected_id, {}).get('name', selected_id)
        amt = out_amount_entry.get().strip() or "1"
        tier = tier_combo.get() or "1"

        gen_name = f"{selected_name} x{amt} (T{tier})"
        gen_id = f"recipe_{selected_id}_t{tier}"

        recipe_name_entry.delete(0, tk.END)
        recipe_name_entry.insert(0, gen_name)

        recipe_id_entry.delete(0, tk.END)
        recipe_id_entry.insert(0, gen_id)

    out_amount_entry.bind("<KeyRelease>", auto_fill_name_and_id)
    tier_combo.bind("<<ComboboxSelected>>", auto_fill_name_and_id)
    auto_fill_name_and_id()

    # --------------------------------------------------------------------------
    # 3. ВХОДНЫЕ ИНГРЕДИЕНТЫ (INPUTS) - Поддержка ЛЮБЫХ предметов!
    # --------------------------------------------------------------------------
    group_inputs = ttk.LabelFrame(scroll_frame, text=" 3. Входные ингредиенты (Базовые и Крафтовые) ", padding="10")
    group_inputs.pack(fill=tk.X, expand=True, pady=5)

    input_rows = []
    inputs_frame = ttk.Frame(group_inputs)
    inputs_frame.pack(fill=tk.X, expand=True)

    def add_input_row(default_item_id: str = "", default_amount: int = 1):
        row_frame = ttk.Frame(inputs_frame, padding="2")
        row_frame.pack(fill=tk.X, pady=3)

        item_var = tk.StringVar(value=default_item_id)
        label_var = tk.StringVar()

        def update_label():
            i_id = item_var.get()
            if i_id in items_dict:
                info = items_dict[i_id]
                tag = "⚡" if info['isBase'] else "🛠️"
                label_var.set(f"{tag} {info['name']} ({i_id})")
            else:
                label_var.set("[ Не выбран ]")

        if not default_item_id and items_dict:
            first_id = sorted(items_dict.keys())[0]
            item_var.set(first_id)

        update_label()

        lbl_item = ttk.Label(row_frame, textvariable=label_var, width=38, font=('Segoe UI', 9))
        lbl_item.pack(side=tk.LEFT, padx=(0, 5))

        def pick_item_for_row():
            def on_picked(chosen_id):
                item_var.set(chosen_id)
                update_label()
            open_item_picker_dialog(root, items_dict, on_picked, title="Выбор ингредиента")

        btn_pick = ttk.Button(row_frame, text="🔍 Выбрать...", command=pick_item_for_row)
        btn_pick.pack(side=tk.LEFT, padx=5)

        ttk.Label(row_frame, text="Кол-во:").pack(side=tk.LEFT, padx=(10, 2))
        amt_ent = ttk.Entry(row_frame, width=8)
        amt_ent.insert(0, str(default_amount))
        amt_ent.pack(side=tk.LEFT, padx=5)

        row_data = {'frame': row_frame, 'item_var': item_var, 'entry': amt_ent, 'update_label': update_label}

        def remove_row():
            row_frame.destroy()
            if row_data in input_rows:
                input_rows.remove(row_data)

        btn_del = ttk.Button(row_frame, text="✕", width=3, command=remove_row)
        btn_del.pack(side=tk.LEFT, padx=5)

        input_rows.append(row_data)

    ttk.Button(group_inputs, text="+ Добавить ингредиент", command=lambda: add_input_row()).pack(anchor=tk.W, pady=5)
    add_input_row()

    def on_items_refreshed():
        """Вызывается при изменении предметов в Управлении предметами."""
        auto_fill_name_and_id()
        for row in input_rows:
            row['update_label']()

    # --------------------------------------------------------------------------
    # 4. ТРЕБУЕМЫЙ НАВЫК И ОПЫТ (REQUIRED SKILL & EXP)
    # --------------------------------------------------------------------------
    group_skill = ttk.LabelFrame(scroll_frame, text=" 4. Требования к навыкам и опыт (опционально) ", padding="10")
    group_skill.pack(fill=tk.X, expand=True, pady=5)

    has_skill_var = tk.BooleanVar(value=False)
    chk_skill = ttk.Checkbutton(group_skill, text="Требуется навык профессии", variable=has_skill_var)
    chk_skill.grid(row=0, column=0, columnspan=2, sticky=tk.W, pady=4)

    prof_ids = list(PROFESSIONS_DATA.keys())
    prof_names = [PROFESSIONS_DATA[p]['name'] for p in prof_ids]

    ttk.Label(group_skill, text="Профессия:").grid(row=1, column=0, sticky=tk.W, pady=4)
    prof_combo = ttk.Combobox(group_skill, values=prof_names, state="readonly", width=22)
    prof_combo.grid(row=1, column=1, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_skill, text="Навык:").grid(row=1, column=2, sticky=tk.W, pady=4, padx=(15, 0))
    skill_combo = ttk.Combobox(group_skill, state="readonly", width=28)
    skill_combo.grid(row=1, column=3, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_skill, text="Уровень (1-4):").grid(row=2, column=0, sticky=tk.W, pady=4)
    skill_lvl_spin = ttk.Spinbox(group_skill, from_=1, to=4, width=6)
    skill_lvl_spin.set(1)
    skill_lvl_spin.grid(row=2, column=1, sticky=tk.W, pady=4, padx=5)

    ttk.Label(group_skill, text="Опыт (expGiven):").grid(row=2, column=2, sticky=tk.W, pady=4, padx=(15, 0))
    exp_entry = ttk.Entry(group_skill, width=12)
    exp_entry.grid(row=2, column=3, sticky=tk.W, pady=4, padx=5)

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
            if not messagebox.askyesno("Предупреждение", f"Рецепт с ID '{r_id}' уже существует. Перезаписать/добавить всё равно?"):
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

        out_item_id = out_item_id_var.get()
        if not out_item_id:
            messagebox.showerror("Ошибка", "Выберите предмет на выходе!")
            return

        try:
            out_amount = int(out_amount_entry.get())
        except ValueError:
            messagebox.showerror("Ошибка", "Количество на выходе должно быть целым числом!")
            return

        outputs = [{'itemId': out_item_id, 'amount': out_amount}]

        inputs = []
        for row in input_rows:
            inp_item_id = row['item_var'].get().strip()
            if not inp_item_id:
                continue
            try:
                inp_amt = float(row['entry'].get().replace(',', '.'))
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
            messagebox.showinfo("Успех 🎉", f"Рецепт '{r_name}' успешно сохранен в src/data/recipes.ts!")
        else:
            messagebox.showerror("Ошибка", "Не удалось записать рецепт в файл.")

    btn_save = ttk.Button(scroll_frame, text=" 💾 СОХРАНИТЬ РЕЦЕПТ В RECIPES.TS ", command=save_recipe)
    btn_save.pack(pady=25, ipadx=20, ipady=8)

    root.mainloop()


# ==============================================================================
# CLI РЕАЛИЗАЦИЯ (Консольный режим)
# ==============================================================================

def run_cli():
    print("=" * 65)
    print("      МЕНЕДЖЕР РЕЦЕПТОВ И ПРЕДМЕТОВ (Консольный режим)      ")
    print("=" * 65)

    items_dict = load_items_full()
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

    tier = 1
    while True:
        try:
            t = int(input("\nТир рецепта [1-4] (по умолчанию 1): ") or "1")
            if 1 <= t <= 4:
                tier = t
                break
        except ValueError:
            pass

    print("\n4. Выходной предмет:")
    out_item_id = input("ID выходного предмета (например: plate_class_1a): ").strip()
    if out_item_id not in items_dict:
        print(f"Предмет '{out_item_id}' не найден в items.ts.")
        add_new = input("Добавить его в items.ts? (y/n): ").strip().lower()
        if add_new == 'y':
            item_name = input("Название предмета на русском: ").strip()
            is_base_ans = input("Это базовый ресурс (isBase)? (y/n) [n]: ").strip().lower() == 'y'
            add_item_to_ts(out_item_id, item_name, is_base=is_base_ans)
            items_dict[out_item_id] = {'id': out_item_id, 'name': item_name, 'icon': 'Box', 'isBase': is_base_ans}

    out_amount = int(input("Количество на выходе [1]: ") or "1")

    item_name = items_dict.get(out_item_id, {}).get('name', out_item_id)
    default_recipe_name = f"{item_name} x{out_amount} (T{tier})"
    default_recipe_id = f"recipe_{out_item_id}_t{tier}"

    recipe_name = input(f"Название рецепта [{default_recipe_name}]: ").strip() or default_recipe_name
    recipe_id = input(f"ID рецепта [{default_recipe_id}]: ").strip() or default_recipe_id

    craft_time = float(input("Время крафта в секундах [10]: ") or "10")
    durability = float(input("Прочность верстака [1]: ") or "1")

    print("\n5. Входные ингредиенты (вводите ID любых базовых или крафтовых предметов):")
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
                is_b = input("  Базовый ресурс (isBase)? (y/n) [n]: ").strip().lower() == 'y'
                add_item_to_ts(inp_id, i_name, is_base=is_b)
                items_dict[inp_id] = {'id': inp_id, 'name': i_name, 'icon': 'Box', 'isBase': is_b}

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
    if '--cli' in sys.argv:
        run_cli()
    else:
        try:
            import tkinter as tk
            root = tk.Tk()
            root.destroy()
            run_gui()
        except Exception as e:
            print(f"Графический интерфейс недоступен ({e}). Переключение в CLI режим...")
            run_cli()
