const Node = require('./node');

class LinkedList {

    /**
     * -D, Method- Конструктор экземпляра списка;
     * -V- {Number} @length: Длина списка;
     * -V- {Node} @_head: Указатель на начало списка;
     * -V- {Node} @_tail: Указатель на конец списка;
     */

    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    /**
     * -D, Method- Добавляет узел в конец списка;
     * -V- {Node} @node: объект добавляемого узла ;
     * -R- this;
     */

    append( data ) {
        let node = new Node( data, null, null );
        if ( this.length === 0 ) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    /**
     * -D, Method- Возвращает данные из головы списка;
     * -R- {} @data: Данные, содержащиеся в элементе;
     */

    head() {
        if ( this._head === null ) {
            return null;
        } else {
            return this._head.data;    
        }
    }

    /**
     * -D, Method- Возвращает данные из конца списка;
     * -R- {} @data: Данные, содержащиеся в элементе;
     */

    tail() {
        if ( this._tail === null ) {
            return null;
        } else {
            return this._tail.data;    
        }
    }

    /**
     * -D, Method- Возвращает данные из элемента с указанным индексом;
     * -V- {Number} @index: Индекс искомого элемента списка;
     * -R- {} @data: Данные, содержащиеся в элементе;
     */

    at( index ) {
        if ( this.length === 0 || index < 0 || index > this.length ) {
            return -1;
        }
        let currNode = this._head;
        for ( let currIdx = 0; currIdx < index; currIdx++ ) {
            currNode = currNode.next;
        }
        return currNode.data;
    }

    /**
     * -D, Method- Вставляет новый элемент с данными по указанному индексу;
     * -V- {Number} @index: Индекс элемента списка;
     * -V- {} @data: Данные элемента;
     * -R- this;
     */

    insertAt( index, data ) {
        if ( this.length === 0 || index < 0 || index > this.length ) {
            return -1;
        }
        let newNode = new Node( data, null, null );
        if ( index === 0 ) {
            newNode.next = this._head;
            this._head.prev = newNode;
            this._head = newNode;
        } else if ( index === this.length - 1 ) {
            newNode.prev = this._tail.prev;
            newNode.prev.next = newNode;
            newNode.next = this._tail;
            this._tail.prev = newNode;
        } else {
            let currNode = this._head;
            for ( let currIdx = 0; currIdx < index; currIdx++ ) {
                currNode = currNode.next;
            }
            newNode.prev = currNode.prev;
            newNode.prev.next = newNode;
            currNode.prev = newNode;
            newNode.next = currNode;
        }
        this.length++;
        return this;
    }

    /**
     * -D, Method- Возвращает true, если список пуст, иначе - false;
     * -R- {Boolean} @result: Результат;
     */

    isEmpty() {
        let result = ( this.length === 0 ) ? true : false;
            return result;
    }

    /**
     * -D, Method- Очищает список, нагружает сборщик мусора;
     * -R- this;
     */

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    /**
     * -D, Method- Удаляет элемент с указанным индексом;
     * -V- {Number} @index: Индекс элемента списка;
     * -R- this;
     */

    deleteAt( index ) {
        if ( this.length === 0 || index < 0 || index > this.length ) {
            return -1;
        }
        let currNode = this._head;
        if ( index === 0 ) {
            this._head = currNode.next;
            if ( this._head === null ) {
                this._tail = null;
            } else {
                this._head.prev = null;
            }
        } else if ( index === this.length - 1 ) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            for ( let currIdx = 0; currIdx < index; currIdx++ ) {
                currNode = currNode.next;
            }
            currNode.prev.next = currNode.next;
            currNode.next.prev = currNode.prev;
        }
        this.length--;
        return this;
    }

    /**
     * -D, Method- Переворачивает список;
     * -R- this;
     */

    reverse() {
        if ( this.length > 1 ) {
            let currNode = this._head;
            this._head = this._tail;
            let prevPtr = null;
            while ( currNode.next !== null ) {
                let tmpPtr = currNode.next;
                currNode.next = prevPtr;
                prevPtr = currNode;
                currNode = tmpPtr;
            }
            currNode.next = prevPtr;
            this._head = currNode;
            prevPtr = null;
            while ( currNode.prev !== null ) {
                let tmpPtr = currNode.prev;
                currNode.prev = prevPtr;
                prevPtr = currNode;
                currNode = tmpPtr;
            }
            currNode.prev = prevPtr;
            this._tail = currNode;
        }
        return this;
    }

    /**
     * -D, Method- Возвращает индекс элемента с указанными данными или -1, если такого значения нет;
     * -V- {} @data: Данные элемента;
     * -R- {Number} @currIdx: Индекс искомого элемента списка;
     * -R- {Number} -1: Индекс искомого элемента списка;
     */

    indexOf( data ) {
        let currNode = this._head;
        let currIdx = 0;
        while ( currIdx < this.length ) {
            if ( currNode.data === data ) {
                return currIdx;
            }
            currNode = currNode.next;
            currIdx++;
        }
        return -1;
    }
}

module.exports = LinkedList;
