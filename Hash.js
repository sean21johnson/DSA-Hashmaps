class HashMap {
    /*
    array _hashTable will hold all of the data is considered the hash table
    length is just the length of the hash map
    capacity will grow in chunks as you resize to a larger array when the hash table is full
    MAX_LOAD_RATIO is the highest ratio between the length and the capacity will be allowed to reach. Resize will take place when we hit the MAX_LOAD_RATIO
    */
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    //hashString function takes a string and hashes it, outputting a number
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }

    /*
    set function used to add item to a hash map
    MAX_LOAD_RATIO we will use to keep track of how full the hashmap is and when it hits a certain % we will move to a bigger hash table using SIZE_RATIO so we reduce the number of collisions
    */
   set(key, value) {
       const loadRatio = (this.length + this._deleted + 1) / this._capacity;
       if (loadRatio > HashMap.MAX_LOAD_RATIO) {
           this._resize(this._capacity * HashMap.SIZE_RATIO)
       }
       //Find the slot where this key should be in
       const index = this._findSlot(key);

       if(!this._hashTable[index]) {
           this.length++;
       }
       this._hashTable[index] = {
           key,
           value,
           DELETED: false
       };
   }

   /*
   _findSlot is used to find the correct slot for a given key. It uses the private _hashString() function to calculate the hash of the key and then uses modulus to find a slot for the key
   with the current capacity. It then loops through the array stopping when it finds the slot with a matching key or an empty slot. Remember, the _hashTable array will never be full due
   to our maximum load factor, so the function will always return a slot
   */
  _findSlot(key) {
      const hash = HashMap._hashString(key);
      const start = hash % this._capacity;

      for (let i = start; i < start + this._capacity; i++) {
          const index = i % this._capacity;
          const slot = this._hashTable[index];
          if (slot === undefined || (slot.key === key && !slot.DELETED)) {
              return index;
          }
      }
  }


}