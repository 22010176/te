import { getDoc, query, setDoc, doc, where, getDocs, updateDoc, or, collection } from 'firebase/firestore'
import { LayDanhSachHocPhan2, LayDuLieuHocSinh, LayKeHoach, LayTatCaKeHoachDaQua, LayHocPhanToChuc, LayLopHocPhanDangToChuc, LayLichCaNhan, LayDanhSachHocPhanDaDangKi, LayDanhSachSinhVien } from '../SchoolAPI/getAPI_'
import { v4 } from 'uuid'
import { GetDifferent } from '../../Utilities'

import { db } from './Init'
async function AddDocToFirestore(ref, data) {
    const id = v4()
    await setDoc(doc(ref, id), data)
    return await getDoc(doc(ref, id))
}

async function updateDocToFirestore(ref, data, obj) {
    const dif = GetDifferent(data.data(), obj, 1)
    if (Object.keys(dif).length > 0) updateDoc(doc(ref, data.id), dif)
    return (await getDoc(doc(ref, data.id)));

}

function CreateAddToFirestoreFunc(ref, _w = {}) {
    return async function (data) {
        const res = (await getDocs(query(ref, ...Object.entries(_w).map(([key, value]) => data[key] && where(key, value, data[key]))))).docs[0]
        if (res) return await updateDocToFirestore(ref, res, data)
        return AddDocToFirestore(ref, data)
    }
}


const a = collection(db, LayDuLieuHocSinh.name)
const b = collection(db, LayTatCaKeHoachDaQua.name)
const c = collection(db, LayDanhSachHocPhanDaDangKi.name)
const d = collection(db, LayDanhSachSinhVien.name)

const AddDLSV = CreateAddToFirestoreFunc(a, { QLSV_NGUOIHOC_ID: '==' })
const AddKHDQ = CreateAddToFirestoreFunc(b, { ID: '==' })
const AddDSHPDDK = CreateAddToFirestoreFunc(c, { DANGKY_LOPHOCPHAN_ID: '==' })
const AddDSSV = CreateAddToFirestoreFunc(d, { QLSV_NGUOIHOC_ID: '==' })

// console.log(())

// await GetAll({ hsID: "5E35B09AACA146D083C03889EAEAC716", maHS: '19010041' })


// async function GetAll({ hsID, maHS }) {
//     const maHSDat = (await getDocs(d)).docs.map(i => i.data().QLSV_NGUOIHOC_MASO)
//     // const hs = (await LayDuLieuHocSinh({ hsID })).Data.find(a => a.QLSV_NGUOIHOC_MASO == maHS)
//     // const hsDat = (await AddDLSV(hs)).data()

//     const kh = await LayTatCaKeHoachDaQua({ hsID })
//     const khDat = (await Promise.all(kh.map(i => AddKHDQ.call({}, i)))).map(i => i.data())

//     for (const _kh of khDat) {
//         const hpddk = (await LayDanhSachHocPhanDaDangKi({ hsID, khID: _kh.ID })).Data
//         const hpddkDat = (await Promise.all(hpddk.map(data => AddDSHPDDK(data)))).map(i => i.data())

//         for (const _hpddk of hpddkDat) {
//             const dssv = (await LayDanhSachSinhVien({ lhpID: _hpddk.DANGKY_LOPHOCPHAN_ID })).Data.rs
//             await Promise.all(dssv.map(data => {
//                 if (maHSDat.includes(data.QLSV_NGUOIHOC_MASO)) return
//                 maHSDat.push(data.QLSV_NGUOIHOC_MASO)
//                 AddDSSV(data)
//             }))
//         }


//     }


//     // console.log({ khDat, hsDat, hpddkDat })
// }
