export function ToggleClass(elem, cssClass) {
    if (!elem || elem.classList.contains(cssClass)) return
    elem.parentElement.querySelector(`.${cssClass}`)?.classList.remove(cssClass)
    elem.classList.add(cssClass)
}
export function LuuDuLieu(key, dulieu = "") { return localStorage.setItem(key, JSON.stringify(dulieu)), dulieu }
export function LayDuLieu(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || '')
    } catch (error) {
        console.log(error)
        return {}
    }
}
export function FindUnDuplicate(src, dst, keys) { return src.filter(item => !dst.some(obj => CompareObject(item, obj, keys))) }
export function FindDuplicate(src, dst, keys) { return src.filter(item => dst.some(obj => CompareObject(item, obj, keys))) }
export function deleteObj(obj, avoid = []) { return Object.keys(obj).forEach(key => avoid.includes(key) || delete obj[key]), obj }
export function CompareObject(__A, __B, __K) {
    if (typeof __A == 'function') return __A(__B)
    if (typeof __B == 'function') return __B(__A)
    if (typeof __A != 'object' && typeof __B != 'object') return __A == __B
    const keys = __K || Object.keys(Object.assign({}, __A, __B))
    return keys.every(key => CompareObject(__A[key], __B[key]))
}
export function StrToCss(str = '') { return '_' + str.replaceAll(' ', '-') }

export function CheckLeap(year) { return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0) }
export function GetDayInMonth(month, year) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2: return CheckLeap(year) ? 29 : 28
        default: return 0;
    }
}
export function GetDifferent(__src, __dst, onlySrcField = 0) {
    if (typeof __src != 'object' || typeof __dst != 'object') return __dst != null && __src !== __dst ? __dst : null;
    const keys = onlySrcField ? Object.keys(__src) : Object.keys(Object.assign({}, __src, __dst))

    return Object.fromEntries(keys.map(key => {
        if (typeof __src[key] == 'object' || typeof __dst[key] == 'object') return
        return __dst[key] != null && __src[key] === __dst[key] ? undefined : [key, __dst[key]]
    }).filter(i => i?.[1]))
}

export function GetFirstAndLastDayOfWeek(day) {
    const year = day.getFullYear(), month = day.getMonth()
    const first = new Date(year, month, day.getDate() - day.getDay())
    const last = new Date(year, month, day.getDate() + 6 - day.getDay())

    return [
        [first.getDate(), first.getMonth() + 1, first.getFullYear()],
        [last.getDate(), last.getMonth() + 1, last.getFullYear()]
    ]
}
export function GetFirstAndLastDayOfWeekDate(day) {
    const year = day.getFullYear(), month = day.getMonth()
    const first = new Date(year, month, day.getDate() - day.getDay())
    const last = new Date(year, month, day.getDate() + 6 - day.getDay())
    return [first, last]
}
export function FormatDate(date) { return date.map(i => (i + '').padStart(2, '0')).join("%2F") }
export function GetDateFromString(str, prefix = '/') { return new Date(str.split(prefix).reverse().map(i => +i)) }
export function CreatePromise(func, ...param) { return new Promise(async resolve => resolve(await func(...param))) }