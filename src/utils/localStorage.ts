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
};

export const saveStorage = (key: Keys, data: object) => {
  const dataStringify = JSON.stringify(data);

  localStorage.setItem(key, dataStringify);
};

if (import.meta.vitest) {
  const { describe, expect, it, vi, afterEach } = import.meta.vitest;

  type DataMock = {
    [i: string]: string;
  };
  class LocalStorageMock {
    #data: DataMock = {};
    #length = 0;

    getItem(name: string) {
      return this.#data[name];
    }

    setItem(name: string, value: string) {
      this.#data[name] = value;
      this.#length = Object.keys(this.#data).length;
    }

    removeItem(name: string) {
      delete this.#data[name];
      this.#length = Object.keys(this.#data).length;
    }

    length() {
      return this.#length;
    }
  }

  describe('LocalStorage utils', () => {
    Object.defineProperty(global, 'localStorage', {
      value: new LocalStorageMock(),
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('It should get a empty array', () => {
      const $getStorage = vi.fn(getStorage);

      expect($getStorage(Keys.Task)).toEqual([]);
    });

    it('It should get one element', () => {
      const $saveStorage = vi.fn(saveStorage);
      const $getStorage = vi.fn(getStorage);

      const tasks = [
        {
          id: 1,
          title: 'My task',
          done: false,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
      ];

      $saveStorage(Keys.Task, tasks);

      expect($getStorage(Keys.Task)).toEqual(tasks);

      $saveStorage.mockClear();
      $saveStorage.mockReset();
      $getStorage.mockClear();
      $getStorage.mockReset();
    });
  });
}
