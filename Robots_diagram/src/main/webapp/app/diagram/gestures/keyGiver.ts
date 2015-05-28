// algoritm to get a key

		
class KeyGiver {

	list: utils.PairArray = [];
	listS: utils.PairArrayS = [];
	private timer;
	public prevKey: number;

	minX:number;
	minY:number;
	maxX:number;
	maxY:number;

	gestures:Gesture[];

	constructor(public newList:utils.PairArray, public oldGesture:Gesture[]) {
		this.gestures = oldGesture;
		this.list = newList;
		this.minX = newList[0].first;
		this.minY = newList[0].second;
		this.maxX = newList[0].first;
		this.maxY = newList[0].second;
		for (var i = 1; i < this.list.length; i++) {
			if (this.list[i].first < this.minX) this.minX = this.list[i].first;
			if (this.list[i].first > this.maxX) this.maxX = this.list[i].first;
			if (this.list[i].second < this.minY) this.minY = this.list[i].second;
			if (this.list[i].second > this.maxY) this.maxY = this.list[i].second;
		}
		if (this.maxX - this.minX > this.maxY - this.minY) {
			var ratio = (this.maxY - this.minY) / (this.maxX - this.minX);
			var midValue = (this.maxY + this.minY) / 2;
			for (var i = 0; i < this.list.length; i++) {
				this.list[i].second = midValue - (midValue - this.list[i].second) * ratio;
			}
		}
		if (this.maxX - this.minX < this.maxY - this.minY) {
			var ratio = (this.maxX - this.minX) / (this.maxY - this.minY);
			var midValue = (this.maxX + this.minX) / 2;
			for (var i = 0; i < this.list.length; i++) {
				this.list[i].first = midValue - (midValue - this.list[i].first) * ratio;
			}
		}
		this.minX = newList[0].first;
		this.minY = newList[0].second;
		for (var i = 1; i < this.list.length; i++) {
			if (this.list[i].first < this.minX) this.minX = this.list[i].first;
			if (this.list[i].second < this.minY) this.minY = this.list[i].second;
		}
	}

	getSymbol(pair:utils.Pair) {
		var curAr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
		var curNumX = pair.first - this.minX;
		var curNumY = pair.second - this.minY;

		return curAr1[Math.floor(curNumX * 9 / (this.maxX + 1 - this.minX))] + +(Math.floor(curNumY * 9 / Math.floor(this.maxY + 1 - this.minY)));
	}

	public getKey() {
		var key = [];
		var index = 0;
		var str1 = this.getSymbol(this.list[0]);
		key[index] = str1;
		index++;
		for (var i = 1; i < this.list.length; i++) {
			var str2 = this.getSymbol(this.list[i]);
			if (str2 != str1) {
				str1 = str2;
				key[index] = str1;
				index++;
			}
		}
		key.sort();
		for (var i = key.length - 2; i >= 0; i--) {
			if (key[i] === key[i + 1])
				key.splice(i, 1);
		}
		console.log(key.toString());
		this.isGesture(key);

		return key;
	}


	public isGesture(key) {
		var result = 1000; //Pseudo-infinite value
		var num = -1;
		for (var i = 0; i < this.gestures.length; i++) {
			var curr = this.gestures[i];
			this.prevKey = i - 1;
			var curRes = this.levenshtein(this.gestures[i].key, key) / Math.max(this.gestures[i].key.length, key.length);

			while (this.prevKey >= 0
			&& this.levenshtein(this.gestures[this.prevKey].key, key) / Math.max(this.gestures[this.prevKey].key.length, key.length) > curRes) {
				this.gestures[this.prevKey + 1] = this.gestures[this.prevKey];
				this.gestures[this.prevKey] = curr;
				this.prevKey--;
			}
		}
		var str = "";
		this.prevKey = 0;
		while (this.prevKey < this.gestures.length)
		{
			var t = 0;
			var q = Math.max(this.gestures[this.prevKey].key.length, key.length);
			t = this.levenshtein(this.gestures[this.prevKey].key, key) / q;
			if (t > this.gestures[this.prevKey].factor)
				break;
			this.prevKey++;
		}

		if (this.prevKey === 0)
			return;

		var names = new Array();
		for (var i = 0; i < this.prevKey; ++i)
			names[i] = this.gestures[i].name;

		if (names.length)
			DiagramController.getInstance().createNode(names[0]);
	}

	// Calculate levenshtain's distance between s1 and s2
	public levenshtein(s1, s2) {
		var ans = 0;

		for (var i = 0; i < s1.length; i++) {
			var minDist = 1000;
			for (var j = 0; j < s2.length; j++) {
				var d1 = Math.abs(s1[i].charCodeAt(0) - s2[j].charCodeAt(0));
				var d2 = Math.abs(s1[i][1] - s2[j][1]);
				if (d1 + d2 < minDist)
					minDist = d1 + d2;
			}
			ans += minDist;
		}

		for (var i = 0; i < s2.length; i++) {
			var minDist = 1000;
			for (var j = 0; j < s1.length; j++) {
				var d1 = Math.abs(s2[i].charCodeAt(0) - s1[j].charCodeAt(0));
				var d2 = Math.abs(s2[i][1] - s1[j][1]);
				if (d1 + d2 < minDist)
					minDist = d1 + d2;
			}
			ans += minDist;
		}
		return ans / 2;
	}
}
