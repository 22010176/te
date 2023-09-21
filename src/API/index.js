import { _DSSV, _LCN, _SV, _DSHP } from './SchoolAPI/index'
import { } from './Firestore/Init'
import { addDoc, doc, getDoc, getDocs, query, queryEqual, setDoc, where } from 'firebase/firestore'
import { v4 } from 'uuid'
import { FormatDate } from '../Utilities'

async function Wait(time) { return await new Promise(resolve => setTimeout(resolve, time)) }

function GetData(funcs = [], force) {
    const funcsArr = funcs.filter(func => typeof func == 'function')
    return async function (params = [], f) {
        if (typeof force == 'function' && f) return await force(...params)
        let data;
        await Promise.all([
            Wait(50), new Promise(async resolve => {
                for (let i = 0; i < funcsArr.length; i++) {
                    data = await funcsArr[i](...params)
                    console.log("testing", { name: funcsArr[i].name, data })
                    if (data) break;
                }
                return resolve(data)
            })
        ])
        return data;
    }
}

export async function __LHCN({ hsID, ngayBD, ngayKT }) {
    return await _LCN({ hsID, ngayBD, ngayKT })
}
export async function __DSSV({ lhpID }) {
    return await _DSSV({ lhpID })
}   