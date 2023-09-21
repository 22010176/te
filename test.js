function FormatDate(date) { return date.map(i => (i + '').padStart(2, '0')).join("%2F") }

const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjhERTVBOEZGMThDODQ3N0ZBNjI5M0I2N0U3OENENUU0O2U4YmYzYmJjYTMwMzRkOWRiY2NlNmUwZDA5ZTc4ZDBkOzIwMjMwODI5MjE1NzM0IiwibmJmIjoxNjkzMzIxMDU0LCJleHAiOjE2OTU5OTk0NTQsImlhdCI6MTY5MzMyMTA1NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.CkWA9IQFYG2UpHgGSWOy2KvD0ft_81XtR4Si9u114p4"

const fs = require('fs')

const { writeFile, readFile } = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const log = 0

async function LayDuLieu(link) {
    if (log) console.log(link)
    return await fetch(link, { headers: { authorization } }).then(data => data.json()).then(data => data)
}
async function LayKeHoach({ hsID, tgID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_KeHoachDangKy/LayDSKeHoachDangKyCaNhan?strDaoTao_ThoiGianDaoTao_Id=${tgID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}
async function LayTatCaKeHoachDaQua({ hsID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_KeHoachDangKy/LayThoiGianDangKyCaNhan?strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    const hk = (await LayDuLieu(link)).Data
    return (await Promise.all(hk.map(({ ID }) => new Promise(async resolve => resolve(await LayKeHoach({ hsID, tgID: ID })))))).map(i => i.Data[0])
}
async function LayDuLieuLopThucHanh({ hsID, ngID, khID, hpID, nlID }) {
    let link = `"https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strMaNhomLop=${nlID}&strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_HocPhan_Id=${hpID}&strNguoiThucHien_Id=${hsID}"`
    return await LayDuLieu(link)
}
async function LayDuLieuHocSinh({ hsID }) {
    return await LayDuLieu(`https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayThongTinChuongTrinhHoc?strQLSV_NguoiHoc_Id=${hsID}`)
}

async function LayKeHoachDangKy({ hsID, ngID }) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSKeHoachDangKyHoc?strDaoTao_ChuongTrinh_Id=${ngID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

async function LayHocPhanToChuc({ hsID, ngID, khID }) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSHocPhanDangToChuc?strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_ChuongTrinh_Id=${ngID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

async function LayDanhSachHocPhanDaDangKi({ hsID, khID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayKetQuaDangKyLopHocPhan?strDangKy_KeHoachDangKy_Id=${khID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}
async function LayLichHoc({ hsID, lhpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_LichTuanTheoLopHocPhan/LayLichTuanTheoLopHocPhan?strNguoiThucHien_Id=${hsID}&strQLSV_NguoiHoc_Id=${hsID}&strDangKy_LopHocPhan_Id=${lhpID}`
    return await LayDuLieu(link)
}
async function LayLichHoc2({ hsID, lhpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_LichTuanTheoLopHocPhan/LayLichTuanTheoLopHocPhan?strQLSV_NguoiHoc_Id=${hsID}&strDangKy_LopHocPhan_Id=${lhpID}`
    return await LayDuLieu(link)
}
async function LayLopThucHanh({ hsID, ngID, khID, hpID, nlID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strMaNhomLop=${nlID}&strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_HocPhan_Id=${hpID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

async function LayLopHocPhanDangToChuc({ hsID, ngID, khID, hpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_HocPhan_Id=${hpID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link);
}
async function LayLichCaNhan({ hsID, ngayBD, ngayKT }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan?strQLSV_NguoiHoc_Id=${hsID}&strNgayBatDau=${typeof ngayBD == 'string' ? ngayBD : FormatDate(ngayBD)}&strNgayKetThuc=${typeof ngayKT == 'string' ? ngayKT : FormatDate(ngayKT)}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link);
}

async function LayDanhSachSinhVien({ lhpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/nhansuapi/api/NS_ThongTinCanBo/LayDSDangKyHoc?action=NS_ThongTinCanBo%2FLayDSDangKyHoc&type=GET&strDaoTao_LopHocPhan_Id=${lhpID}`
    return await LayDuLieu(link)
}

async function LayDanhSachHocPhan({ hsID, ngID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayKetQuaTichLuyTheoKhoi?strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}`
    return await LayDuLieu(link)
}
async function LayDanhSachHocPhan2({ ngID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/kehoachchuongtrinhapi/api/KHCT_HocPhan_ChuongTrinh/LayDanhSach?strDaoTao_ChuongTrinh_Id=${ngID}&pageSize=10000000`
    return await LayDuLieu(link)
}
async function LayDuLieuSinhVienChiTiet({ hsID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_HoSo/LayChiTiet?strId=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}
async function LayDiemSinhVien({ hsID, ngID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/KetQuaHocTapCaNhan?strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

const pathRes = path.join(__dirname, 'Data')

async function GetAll({ hsID }, _pool) {
    if (!hsID) return []
    try {
        const SVPool = _pool || []

        // const maHSDat = (await getDocs(d)).docs.map(i => i.data().QLSV_NGUOIHOC_MASO)
        const e = pathRes

        if (!fs.existsSync(e)) fs.mkdirSync(e);

        const [khpath, hppath, svpath] = ['KH', 'HP', 'SV', 'HPNG'].map(a => {
            const aa = path.join(e, a)
            if (!fs.existsSync(aa)) fs.mkdirSync(aa)
            return aa
        })
        const kh = await LayTatCaKeHoachDaQua({ hsID })

        for (const _kh of kh) {
            const khPath = path.join(khpath, _kh.TENKEHOACH + '.json')
            if (!fs.existsSync(khPath)) fs.writeFileSync(khPath, JSON.stringify(_kh, null, 2), { encoding: 'utf-8' })

            const hpddk = (await LayDanhSachHocPhanDaDangKi({ hsID, khID: _kh.ID })).Data

            if (!Array.isArray(hpddk)) continue


            for (const _hpddk of hpddk) {
                const hpPath = path.join(hppath, _hpddk.DANGKY_LOPHOCPHAN_ID + '.json')
                if (fs.existsSync(hpPath)) continue
                fs.writeFileSync(hpPath, JSON.stringify(_hpddk, null, 2), { encoding: 'utf-8' })

                const dssv = (await LayDanhSachSinhVien({ lhpID: _hpddk.DANGKY_LOPHOCPHAN_ID })).Data.rs

                await Promise.all(dssv.map(data => {
                    const svPath = path.join(svpath, data.QLSV_NGUOIHOC_MASO + '.json')
                    if (fs.existsSync(svPath)) return
                    SVPool.push(data.QLSV_NGUOIHOC_ID)

                    return writeFile(svPath, JSON.stringify(data, null, 2), { encoding: 'utf-8' })
                }))
            }
        }

        return SVPool.filter(i => i)
    } catch (err) {
        console.log(err)
    }
    return []
}
async function ScrawDataSV(hsID, sinhVienNum = 1000) {
    const _pool = new Set()
    const use = new Set()
    const free = [hsID]

    do {
        const cur = free[Math.floor(Math.random() * free.length)]
        use.add(cur)
        free.splice(free.indexOf(cur), 1)

        const data = await GetAll({ hsID: cur }, [..._pool])
        if (!data.length) break
        data.forEach(dat => {
            if (!dat) return
            _pool.add(dat)
            if (!use.has(dat) && !free.includes(dat)) free.push(dat)
        })
        console.log('Pool: ', _pool.size)
        console.log('Data: ', data.length)
        console.log('Free: ', free.length)
        console.log("________________________________________________________________________")

    } while (_pool.size < sinhVienNum && free.length > 0)
}

async function _LayDuLieuHocSinh(num = 50) {
    const svPath = path.join(pathRes, 'SV')
    const resPath = path.join(pathRes, "DuLieuSinhVien")

    if (!fs.existsSync(resPath)) fs.mkdirSync(resPath)

    const files = fs.readdirSync(svPath)
    const len = files.length

    const a = Array(Math.ceil(len / num)).fill().map((_, i) => files.slice(i * num, i * num + num).filter(i => i))

    for (let i of a) {
        await Promise.all(i.map(async maSV => {
            const data = JSON.parse(fs.readFileSync(path.join(svPath, maSV), { encoding: 'utf-8' }, function (e) { console.log(e) }).toString())
            return new Promise(async resolve => resolve((await LayDuLieuHocSinh({ hsID: data.QLSV_NGUOIHOC_ID })).Data)).then(async data => await writeFile(path.join(resPath, maSV), JSON.stringify(data, num, 2)))
        }))
    }
}

async function _LayDuLieuHocSinhChiTiet(num = 50) {
    const svPath = path.join(pathRes, 'SV')
    const resPath = path.join(pathRes, "DuLieuSinhVienChiTiet")

    if (!fs.existsSync(resPath)) fs.mkdirSync(resPath)

    const files = fs.readdirSync(svPath)
    const len = files.length

    const a = Array(Math.ceil(len / num)).fill().map((_, i) => files.slice(i * num, i * num + num).filter(i => i))

    for (let i of a) {
        await Promise.all(i.map(async maSV => {
            const data = JSON.parse(fs.readFileSync(path.join(svPath, maSV), { encoding: 'utf-8' }, function (e) { console.log(e) }).toString())
            return new Promise(async resolve => resolve((await LayDuLieuSinhVienChiTiet({ hsID: data.QLSV_NGUOIHOC_ID })).Data)).then(async data => writeFile(path.join(resPath, maSV), JSON.stringify(data, num, 2)))
        }))
    }
}
async function _LayDuLieuDiemHocSinh(num = 50) {
    const svPath = path.join(pathRes, 'SV')
    const resPath = path.join(pathRes, "DiemSinhVien")

    if (!fs.existsSync(resPath)) fs.mkdirSync(resPath)

    const files = fs.readdirSync(svPath)
    const len = files.length

    const a = Array(Math.ceil(len / num)).fill().map((_, i) => files.slice(i * num, i * num + num).filter(i => i))

    for (let i of a) {
        await Promise.all(i.map(async maSV => {
            const data = JSON.parse(fs.readFileSync(path.join(svPath, maSV), { encoding: 'utf-8' }, function (e) { console.log(e) }).toString())
            const a = path.join(resPath, maSV)
            // console.log(maSV)
            if (fs.existsSync(a)) return
            return new Promise(async (resolve, reject) => {
                try {
                    const _ = (await LayDiemSinhVien({ hsID: data.QLSV_NGUOIHOC_ID, ngID: data.DAOTAO_TOCHUCCHUONGTRINH_ID })).Data
                    return resolve(writeFile(a, JSON.stringify(_, null, 2), { encoding: 'utf-8' }))
                } catch (e) { console.log(e) }
            })
        }))
    }
}

_LayDuLieuDiemHocSinh(20)
async function _LayNganh(id, keys, _dst) {
    if (!keys || !id || !_dst) return

    const dataPath = path.join(pathRes, "DuLieuSinhVien")
    const resPath = path.join(pathRes, _dst)
    if (!fs.existsSync(resPath)) fs.mkdirSync(resPath)

    fs.readdirSync(dataPath).map(i => path.join(dataPath, i)).forEach(i => {
        const data = JSON.parse(fs.readFileSync(i, { encoding: 'utf-8' }))[0]

        const result = {}

        keys.forEach(key => result[key] = data[key])


        const a = path.join(resPath, data[id] + '.json')
        if (fs.existsSync(a)) return
        fs.writeFileSync(a, JSON.stringify(result, null, 2))
    })
    // const hp = []
}

async function _layDuLieu() {
    const dataPath = path.join(pathRes, 'Nganh')
    const resPath = path.join(pathRes, 'HocPhanNganh2')
    if (!fs.existsSync(resPath)) fs.mkdirSync(resPath)

    const files = fs.readdirSync(dataPath)

    let num = 10;
    const arr = Array(Math.ceil(files.length / num)).fill().map((_, i) => files.slice(i * num, i * num + num))
    for (let paths of arr) await Promise.all(paths.map(async i => {
        const data = JSON.parse(fs.readFileSync(path.join(dataPath, i), { encoding: 'utf-8' }))

        const a = path.join(resPath, data.DAOTAO_CHUONGTRINH_MA + '.json')
        if (fs.existsSync(a)) return
        try {
            const obj = (await LayDanhSachHocPhan2({ ngID: data.DAOTAO_TOCHUCCHUONGTRINH_ID })).Data
            fs.writeFileSync(a, JSON.stringify(obj, null, 2))

        } catch (E) {
            console.log(data, E)
        }

    }))

}
// _LayDuLieuHocSinh()
// _layDuLieu()
// LayDanhSachHocPhan2({ ngID: '73506443F9C549C397DB5F14774D3355' }).then(console.log)
// _LayNganh('DAOTAO_LOPQUANLY_TEN', ['DAOTAO_LOPQUANLY_TEN', 'DAOTAO_LOPQUANLY_MA', 'DAOTAO_LOPQUANLY_ID'], 'LopQuanLy')
// _LayNganh('DAOTAO_KHOAQUANLY_TEN', ['DAOTAO_KHOAQUANLY_TEN', 'DAOTAO_KHOAQUANLY_ID', 'DAOTAO_KHOAQUANLY_MA'], 'KhoaQuanLy')