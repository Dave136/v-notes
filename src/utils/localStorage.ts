export const enum Keys {
  Task = 'Task',
}

export const getStorage = (key: Keys) => {
  try {
    const result = localStorage.getItem(key);
    
    if (!result) return [];
    
    return JSON.parse(result as string);
  } catch (err) {
    return [];
  }
}

export const saveStorage = (key: Keys, data: object) => {
  const dataStringify = JSON.stringify(data);

  localStorage.setItem(key, dataStringify);
}