export const SCROLL_DIRECTION_BACKWARD = -1;
export const SCROLL_DIRECTION_FORWARD = 1;

export default class RowPositionManager {
    constructor(totalRow, rowHeight, rowNum) {
        this._lastIndex = -1;
        this._rowHeight = rowHeight;
        this._totalRow = totalRow;
        this._rowNum = rowNum;
    }

    getVisibleRange(containerHeight, offset, scrollDirection) {
        const maxOffset = offset + containerHeight;
        const start = this._findNearestIndex(offset);

        offset = this._getRowOffset(start);

        let stop = start;

        while (offset < maxOffset && stop < this._totalRow - 1) {
            stop++;
            offset += this._getRowOffset(stop);
        }

        const rangeByDirection = this.getRangeByDirection(scrollDirection, start, stop);

        this._getRowOffset(rangeByDirection.stopIndex);
        return { start: rangeByDirection.startIndex, stop: rangeByDirection.stopIndex };
    }

    getRangeByDirection(direction, startIndex, stopIndex) {
        if (direction === SCROLL_DIRECTION_FORWARD) {
            return {
                startIndex: Math.max(0, startIndex),
                stopIndex: Math.min(this._totalRow - 1, stopIndex + this._rowNum)
            };
        } else {
            return {
                startIndex: Math.max(0, startIndex - this._rowNum),
                stopIndex: Math.min(this._totalRow - 1, stopIndex)
            };
        }
    }

    _findNearestIndex(offset) {
        offset = Math.max(0, offset);
        const lastOffset = this._getLastOffset();
        const lastIndex = Math.max(0, this._lastIndex);

        if (lastOffset >= offset) {
            // If we've already measured cells within this range just use a binary search as it's faster.
            return this._binarySearch(lastIndex, 0, offset);
        } else {
            // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
            // The exponential search avoids pre-computing sizes for the full set of cells as a binary search would.
            // The overall complexity for this approach is O(log n).
            return this._exponentialSearch(lastIndex, offset);
        }
    }

    _getLastOffset() {
        return this._lastIndex < 0 ? 0 : this._lastIndex * this._rowHeight;
    }

    _binarySearch(high, low, offset) {
        while (low <= high) {
            const middle = low + Math.floor((high - low) / 2);
            const currentOffset = this._getRowOffset(middle);

            if (currentOffset === offset) {
                return middle;
            } else if (currentOffset < offset) {
                low = middle + 1;
            } else if (currentOffset > offset) {
                high = middle - 1;
            }
        }

        if (low > 0) {
            return low - 1;
        } else {
            return 0;
        }
    }

    _exponentialSearch(index, offset) {
        let interval = 1;

        while (index < this._cellCount && this._getRowOffset(index) < offset) {
            index += interval;
            interval *= 2;
        }

        return this._binarySearch(
            Math.min(index, this._cellCount - 1),
            Math.floor(index / 2),
            offset
        );
    }

    _getRowOffset(index) {
        this._lastIndex = index;
        const lastOffset = this._getLastOffset() + this._rowHeight;
        console.log(`_lastIndex: ${this._lastIndex} - offset: ${lastOffset}`);

        return lastOffset;
    }
}