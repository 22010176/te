import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, collection, arrayUnion, addDoc, getDoc, getDocs, where, query, updateDoc } from 'firebase/firestore'

import { LayDuLieuHocSinh, LayDanhSachHocPhan2, } from '../../SchoolAPI/getAPI_'
import { v4 } from 'uuid';

const Collections = (async function () {
    const con1 = {
        apiKey: "AIzaSyBWe8c17ovbliFc9DBqaslAn1ajxi_HCTU",
        authDomain: "another-bf579.firebaseapp.com",
        projectId: "another-bf579",
        storageBucket: "another-bf579.appspot.com",
        messagingSenderId: "521310357992",
        appId: "1:521310357992:web:40665bb9de43e7bf3afc5d",
        measurementId: "G-D0L909TCDZ"
    } // aonnther
    const con2 = {
        apiKey: "AIzaSyDI5-9Obh7ZU6EzAYd0qPwcR493Q31XK2s",
        authDomain: "sincere-woods-300113.firebaseapp.com",
        projectId: "sincere-woods-300113",
        storageBucket: "sincere-woods-300113.appspot.com",
        messagingSenderId: "554037397091",
        appId: "1:554037397091:web:2b913b96d534130e17da56",
        measurementId: "G-6WLYK0YJNZ"
    } // testing-project
    const con3 = {
        apiKey: "AIzaSyDn_5GB0SfqP9ioepNaSehLaFxZkI2m438",
        authDomain: "elated-emitter-363807.firebaseapp.com",
        databaseURL: "https://elated-emitter-363807-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "elated-emitter-363807",
        storageBucket: "elated-emitter-363807.appspot.com",
        messagingSenderId: "325642719623",
        appId: "1:325642719623:web:602a8cb09eb35d08b0c322",
        measurementId: "G-B3LQBP5BNN"
    }// first project
    const app = initializeApp(con3);
    const db = getFirestore(app)

    function GenerateConverter(input, output) {
        return {
            toFirestore(data) {
                const obj = {}
                input?.forEach(key => (obj[key] = data[key] || null))
                return obj
            },
            fromFirestore(snapshot, options) {
                const data = snapshot.data(options)
                const result = {}
                output?.forEach(key => result[key] = data[key])
                return result
            }
        }
    }

    const Connect = collection(db, 'Connect_Test')/*.withConverter({
        toFirestore({ from, to }) { return { from: from.id, fromPath: from.ref.path, to: to.id, toPath: to.ref.path } },
        fromFirestore(snapshot, options) { return snapshot.data(options) }
    })*/
    const ChuongTrinhHoc = collection(db, "ChuongTrinhHocTest").withConverter(GenerateConverter([
        // '__ID',
        'DAOTAO_TOCHUCCHUONGTRINH_ID',
        'DAOTAO_CHUONGTRINH_TEN',
        "DAOTAO_CHUONGTRINH_MA",
        'DAOTAO_TOCHUCCHUONGTRINH_TEN'
    ], [
        'DAOTAO_TOCHUCCHUONGTRINH_TEN',
        'DAOTAO_TOCHUCCHUONGTRINH_ID',
        'DAOTAO_CHUONGTRINH_TEN',
        "DAOTAO_CHUONGTRINH_MA",
    ]))

    const LopQuanLy = collection(db, "LopQuanLyTest").withConverter(GenerateConverter([
        // '__ID',
        "DAOTAO_LOPQUANLY_ID",
        "DAOTAO_LOPQUANLY_TEN",
        "DAOTAO_LOPQUANLY_MA",
    ], [
        "DAOTAO_LOPQUANLY_ID",
        "DAOTAO_LOPQUANLY_TEN",
        "DAOTAO_LOPQUANLY_MA",
    ]))
    const KhoaQuanLy = collection(db, "KhoaQuanLuTest").withConverter(GenerateConverter([
        // '__ID',
        'DAOTAO_KHOADAOTAO_ID',
        'DAOTAO_KHOADAOTAO_TEN',
        'DAOTAO_KHOADAOTAO_MA'
    ], [
        'DAOTAO_KHOADAOTAO_ID',
        'DAOTAO_KHOADAOTAO_TEN',
        'DAOTAO_KHOADAOTAO_MA'
    ]))
    const HeDaoTao = collection(db, 'HeDaoTao').withConverter(GenerateConverter([
        // '__ID',
        "DAOTAO_HEDAOTAO_ID",
        "DAOTAO_HEDAOTAO_TEN",
        "DAOTAO_HEDAOTAO_MA",
    ], [
        "DAOTAO_HEDAOTAO_ID",
        "DAOTAO_HEDAOTAO_TEN",
        "DAOTAO_HEDAOTAO_MA",
    ]))
    const TrangThaiHoc = collection(db, 'TrangThaiHoc').withConverter(GenerateConverter([
        // '__ID',
        "QLSV_TRANGTHAINGUOIHOC_ID",
        "QLSV_TRANGTHAINGUOIHOC_TEN",
        "QLSV_TRANGTHAINGUOIHOC_MA",
    ], [
        "QLSV_TRANGTHAINGUOIHOC_ID",
        "QLSV_TRANGTHAINGUOIHOC_TEN",
        "QLSV_TRANGTHAINGUOIHOC_MA",
    ]))
    const ThuocTinhHocPhan = collection(db, "ThuocTinhHocPhan").withConverter(GenerateConverter([
        // '__ID',
        "THUOCTINHHOCPHAN_ID",
        "THUOCTINHHOCPHAN_TEN",
        "THUOCTINHHOCPHAN_MA",
    ], [
        "THUOCTINHHOCPHAN_ID",
        "THUOCTINHHOCPHAN_TEN",
        "THUOCTINHHOCPHAN_MA",
    ]))
    const SinhVien = collection(db, 'SinhVienTest').withConverter(GenerateConverter([
        // "__ID",
        "QLSV_NGUOIHOC_ID",
        "QLSV_NGUOIHOC_NGAYSINH",
        "QLSV_NGUOIHOC_MASO",
        "QLSV_NGUOIHOC_HODEM",
        "QLSV_NGUOIHOC_TEN",
        "QLSV_NGUOIHOC_GIOITINH",
        "TTLL_KHICANBAOTINCHOAI_ODAU",
        "TTLL_DIENTHOAICANHAN",
        "TTLL_EMAILCANHAN",
    ], [
        "QLSV_NGUOIHOC_ID",
        "QLSV_NGUOIHOC_NGAYSINH",
        "QLSV_NGUOIHOC_MASO",
        "QLSV_NGUOIHOC_HODEM",
        "QLSV_NGUOIHOC_TEN",
        "QLSV_NGUOIHOC_GIOITINH",
    ]))

    const HocPhan = collection(db, "HocPhanTest").withConverter(GenerateConverter([
        // "__ID",
        "ID",
        "THONGTINPHANBOTIETHOC",
        "DAOTAO_HOCPHAN_ID",
        "DAOTAO_HOCPHAN_TEN",
        "DAOTAO_HOCPHAN_MA",
        "DAOTAO_HOCPHAN_SOTINCHI",
        "HOCTRINHAPDUNGHOCTAP",
        "HOCTRINHAPDUNGTINHHOCPHI",
        "LAMONTINHDIEMTHEOCHUONGTRINH",
        "TONGSOTIETPHANBO",
        "TONGSOTINCHITHEOKHOIKT",
    ], [
        // "__ID",
        "ID",
        "DAOTAO_HOCPHAN_ID",
        "THONGTINPHANBOTIETHOC",
        "DAOTAO_HOCPHAN_TEN",
        "DAOTAO_HOCPHAN_MA",
        "DAOTAO_HOCPHAN_SOTINCHI",
        "HOCTRINHAPDUNGHOCTAP",
        "HOCTRINHAPDUNGTINHHOCPHI",
        "LAMONTINHDIEMTHEOCHUONGTRINH",
        "TONGSOTIETPHANBO",
        "TONGSOTINCHITHEOKHOIKT",
    ]))


    const KeHoach = collection(db, "KeHoachTest").withConverter(GenerateConverter([
        "ID",
        "TENKEHOACH",
        "MAKEHOACH",
        "MOTA",
        "TRANGTHAI_ID",
        "KIEUHOC_IDS",
        "KIEMTRASOTINCHITOIDA",
        "KIEMTRASOTINCHITOITHIEU",
        "HIENTHITHONGTINGIANGVIEN",
        "KIEMTRARANGBUOCHOCPHAN",
        "GIODANGKYTRONGNGAYDAU",
        "GIOKETTHUCTRONGNGAYCUOI",
        "QUYDINHTINCHITOIDA_ID",
        "QUYDINHDANGKYNANGDIEM_ID",
        "KIEMTRATRUNGLOPKHONGXEP",
        "NGAYBATDAU",
        "NGAYKETTHUC",
        "KIEMTRATRUNGTHOIGIAN_ID",
        "KHONGCHOPHEPDOILOPHOCPHAN",
        "KHONGCHOPHEPCOVANDANGKY",
        "QUYDINHKIEMTRAHOCPHI_ID",
        "SOHOCPHINOTOIDACHOPHEP",
        "SOTINCHITOIDA",
        "SOTINCHITOITHIEU",
        "DAOTAO_THOIGIANDAOTAO_ID",
        "PHANTRAMDANGKYVUOTQUYDINH",
        "DANGKYTHEOTOHOPQUYDINH_ID",
        "PHUTDANGKYTRONGNGAYDAU",
        "PHUTKETTHUCTRONGNGAYCUOI",
        "SONGAYDUOCPHEPRUTHOCPHAN",
        "CHOPHEPDANGKYNGOAICHUONGTRINH",
        "CHOPHEPDANGKYHPTUONGDUONG",
        "CHOPHEPNGUOCHOCHUYHOCPHAN",
        "NGAYTAO",
        "NGAYCAPNHATCUOI",
        "NGUOICAPNHATCUOI_ID",
        "NGUOITAO_ID",
        "TRANGTHAISINHVIEN_IDS",
        "KIEMTRATRUNGLICH",
        "KIEMTRATAICHINH",
        "CHIDANGKYMOTLANTRONGKY",
        "MOHINHDANGKY_ID",
        "MUCDIEMCHUHE4_NANGDIEM",
        "SOGIAYCHO",
        "NGUONDULIEUTHOIKHOABIEU_ID",
        "HANHDONGDUOCPHEP_ID",
        "QUYDINHKIEMTRAHOCPHI_KHOAN_IDS",
        "NGUONDULIEUDIEM_ID",
        "HIEULUC",
        "SOTINCHITOIDAN2",
        "SOTINCHITOITHIEUN2",
        "PHANLOAIDOTDANGKY_ID",
        "KIEMTRADINHHUONGHOCTAP",
        "HIENTHIDONGIAHOCPHI",
        "QUYDINHTINCHITOIDA_PHAMVI_ID",
        "TINHPHITUDONG",
        "TINHPHITUDONGKHIXACNHAN",
    ], [
        "ID",
        "TENKEHOACH",
        "MAKEHOACH",
        "MOTA",
        "TRANGTHAI_ID",
        "KIEUHOC_IDS",
        "KIEMTRASOTINCHITOIDA",
        "KIEMTRASOTINCHITOITHIEU",
        "HIENTHITHONGTINGIANGVIEN",
        "KIEMTRARANGBUOCHOCPHAN",
        "GIODANGKYTRONGNGAYDAU",
        "GIOKETTHUCTRONGNGAYCUOI",
        "QUYDINHTINCHITOIDA_ID",
        "QUYDINHDANGKYNANGDIEM_ID",
        "KIEMTRATRUNGLOPKHONGXEP",
        "NGAYBATDAU",
        "NGAYKETTHUC",
        "KIEMTRATRUNGTHOIGIAN_ID",
        "KHONGCHOPHEPDOILOPHOCPHAN",
        "KHONGCHOPHEPCOVANDANGKY",
        "QUYDINHKIEMTRAHOCPHI_ID",
        "SOHOCPHINOTOIDACHOPHEP",
        "SOTINCHITOIDA",
        "SOTINCHITOITHIEU",
        "DAOTAO_THOIGIANDAOTAO_ID",
        "PHANTRAMDANGKYVUOTQUYDINH",
        "DANGKYTHEOTOHOPQUYDINH_ID",
        "PHUTDANGKYTRONGNGAYDAU",
        "PHUTKETTHUCTRONGNGAYCUOI",
        "SONGAYDUOCPHEPRUTHOCPHAN",
        "CHOPHEPDANGKYNGOAICHUONGTRINH",
        "CHOPHEPDANGKYHPTUONGDUONG",
        "CHOPHEPNGUOCHOCHUYHOCPHAN",
        "NGAYTAO",
        "NGAYCAPNHATCUOI",
        "NGUOICAPNHATCUOI_ID",
        "NGUOITAO_ID",
        "TRANGTHAISINHVIEN_IDS",
        "KIEMTRATRUNGLICH",
        "KIEMTRATAICHINH",
        "CHIDANGKYMOTLANTRONGKY",
        "MOHINHDANGKY_ID",
        "MUCDIEMCHUHE4_NANGDIEM",
        "SOGIAYCHO",
        "NGUONDULIEUTHOIKHOABIEU_ID",
        "HANHDONGDUOCPHEP_ID",
        "QUYDINHKIEMTRAHOCPHI_KHOAN_IDS",
        "NGUONDULIEUDIEM_ID",
        "HIEULUC",
        "SOTINCHITOIDAN2",
        "SOTINCHITOITHIEUN2",
        "PHANLOAIDOTDANGKY_ID",
        "KIEMTRADINHHUONGHOCTAP",
        "HIENTHIDONGIAHOCPHI",
        "QUYDINHTINCHITOIDA_PHAMVI_ID",
        "TINHPHITUDONG",
        "TINHPHITUDONGKHIXACNHAN",
    ]))
    return { KeHoach, HocPhan, SinhVien, ThuocTinhHocPhan, TrangThaiHoc, HeDaoTao, KhoaQuanLy, LopQuanLy, ChuongTrinhHoc, Connect }
})();

export default Collections;

// export { SinhVienDN, SinhVien, HocPhan, DanhSachLienKet, LichHoc }