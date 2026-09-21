type ComparatorCallback<T = unknown> = (first: T, second: T) => boolean;

export default function bubleSort<T = unknown>(array: T[], comparator: ComparatorCallback<T>): void {
  for(let i: number = 0; i < array.length; i++) {
    for(let j: number = i + 1; j < array.length; j++) {
      if(comparator(array[i], array[j])) {
        const tmp: any = array[j];

        array[j] = array[i];
        array[i] = tmp;
      }
    }
  }
};
