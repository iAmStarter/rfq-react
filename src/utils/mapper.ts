// ──────────────────────────────────────────────────────────────
//  1️⃣  Raw payload types – copy/paste from your JSON
// ──────────────────────────────────────────────────────────────

export interface RawUser {
  USER_ID: number;
  USERNAME: string;
  PASSWORD: string | null;
  FIRST_NAME: string;
  MIDDLE_NAME: string | null;
  LAST_NAME: string;
  EMAIL: string;
  EMPLOYEE_NUMBER: string;
  BU_NAME: string;
  PLANT: string;
  AD_CODE: string | null;
  IS_CUSTOMER: number;
  BU_CODE: string;
  PLANNER_CODE: string;
  IS_ACTIVATE: number;
  CREATED_BY: string;
  CREATED_DATE: string;   // ISO string
  UPDATED_BY: string | null;
  UPDATED_DATE: string | null;
  OTP_CODE: string | null;
  OTP_DATE: string | null;
  IS_APPROVE: number;
  APPROVED_DATE: string | null;
  USER_IMG: string;   // path relative to your static folder
  LAST_LOGIN_DATE: string;
  CHANGED_PASSWORD_DATE: string | null;
  INCORRECT_PASSWORD_TIMES: number;
  IS_CHANGED_PASSWORD: string | null;
  USER_TYPE: string | null;
}

export interface RawMenu {
  MENU_ID: number;
  MENU_NAME: string;
  MENU_PATH: string;
  MENU_SEQUENCE: number;
  MENU_PARENT: number | null;
  MENU_SYSTEM: string;
  MENU_ICON: string;
  IS_ACTIVE: number;
}

// Payload that you posted
export interface RawPayload {
  user: RawUser[];
  menu: RawMenu[];
}

// ──────────────────────────────────────────────────────────────
//  2️⃣  Target interfaces
// ──────────────────────────────────────────────────────────────

export interface Menu {
  id: number;
  name: string;
  path: string;
  sequence: string; // keeping it as string to match your definition
  icon: string;
  subMenus: Menu[];
}

export interface User {
  firstName: string;
  lastName: string;
  imageProfile: string;
  buName: string;
  buCode: string;
  email: string;
  plant: string;
  listMenu: Menu[];
}

// ──────────────────────────────────────────────────────────────
//  3️⃣  Mapping utilities
// ──────────────────────────────────────────────────────────────

/**
 * Builds a hierarchical menu tree from a flat array.
 * @param flatMenus  Array of RawMenu
 * @returns  Top‑level menus with nested subMenus
 */
export function buildMenuTree(flatMenus: RawMenu[]): Menu[] {
  const idMap = new Map<number, Menu>();

  // 1️⃣  Initialise every menu entry
  flatMenus.forEach((m) => {
    idMap.set(m.MENU_ID, {
      id: m.MENU_ID,
      name: m.MENU_NAME,
      path: m.MENU_PATH,
      sequence: m.MENU_SEQUENCE.toString(),
      icon: m.MENU_ICON,
      subMenus: [],
    });
  });

  // 2️⃣  Attach children to parents
  const roots: Menu[] = [];
  flatMenus.forEach((m) => {
    const node = idMap.get(m.MENU_ID)!;
    if (m.MENU_PARENT) {
      const parent = idMap.get(m.MENU_PARENT);
      if (parent) parent.subMenus.push(node);
    } else {
      roots.push(node);
    }
  });

  // 3️⃣  Sort each level by sequence (optional but handy)
  const sort = (menus: Menu[]) => {
    menus.sort((a, b) => Number(a.sequence) - Number(b.sequence));
    menus.forEach((m) => sort(m.subMenus));
  };
  sort(roots);

  return roots;
}

/**
 * Maps a RawUser to the User interface.
 * @param raw RawUser
 * @returns  User
 */
export function mapUser(raw: RawUser, menuTree: Menu[]): User {
  return {
    firstName: raw.FIRST_NAME,
    lastName: raw.LAST_NAME,
    imageProfile: raw.USER_IMG,
    buName: raw.BU_NAME,
    buCode: raw.BU_CODE,
    email: raw.EMAIL,
    plant: raw.PLANT,
    listMenu: menuTree,
  };
}

/**
 * Entry point – convert the whole payload into a User instance.
 * @param payload  RawPayload
 * @returns  User
 */
export function mapPayload(payload: RawPayload): User {
  if (!payload.user || payload.user.length === 0)
    throw new Error('Payload missing user data');

  const menuTree = buildMenuTree(payload.menu);
  return mapUser(payload.user[0], menuTree);
}