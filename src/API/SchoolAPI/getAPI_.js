import { FormatDate } from "../../Utilities"
const authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjhERTVBOEZGMThDODQ3N0ZBNjI5M0I2N0U3OENENUU0OzdhOThhNmRlMTNkNTQ0NmI4YmVhYmI3MDE3YWZlYWVhOzIwMjMwOTA2MjEwMTI3IiwibmJmIjoxNjk0MDA4ODg3LCJleHAiOjE2OTY2MDA4ODcsImlhdCI6MTY5NDAwODg4NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.lW8hDyV2GPsa1XTKmGWtT9ZA7lr61LiHEAbKkTn_cWU"

async function LayDuLieu(link) {
    return await fetch(link, { headers: { authorization } }).then(data => data.json())
}
export async function LayKeHoach({ hsID, tgID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_KeHoachDangKy/LayDSKeHoachDangKyCaNhan?strDaoTao_ThoiGianDaoTao_Id=${tgID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}
export async function LayTatCaKeHoachDaQua({ hsID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_KeHoachDangKy/LayThoiGianDangKyCaNhan?strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    const hk = (await LayDuLieu(link)).Data
    return (await Promise.all(hk.map(({ ID }) => new Promise(async resolve => resolve(await LayKeHoach({ hsID, tgID: ID })))))).map(i => i.Data[0])
}
export async function LayDuLieuLopThucHanh({ hsID, ngID, khID, hpID, nlID }) {
    let link = `"https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strMaNhomLop=${nlID}&strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_HocPhan_Id=${hpID}&strNguoiThucHien_Id=${hsID}"`
    return await LayDuLieu(link)
}
export async function LayDuLieuHocSinh({ hsID }) {
    return await LayDuLieu(`https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayThongTinChuongTrinhHoc?strQLSV_NguoiHoc_Id=${hsID}`)
}

export async function LayKeHoachDangKy({ hsID, ngID }) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSKeHoachDangKyHoc?strDaoTao_ChuongTrinh_Id=${ngID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

export async function LayHocPhanToChuc({ hsID, ngID, khID }) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSHocPhanDangToChuc?strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_ChuongTrinh_Id=${ngID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

export async function LayDanhSachHocPhanDaDangKi({ hsID, khID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayKetQuaDangKyLopHocPhan?strDangKy_KeHoachDangKy_Id=${khID}&strQLSV_NguoiHoc_Id=${hsID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}
export async function LayLichHoc({ hsID, lhpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_LichTuanTheoLopHocPhan/LayLichTuanTheoLopHocPhan?strNguoiThucHien_Id=${hsID}&strQLSV_NguoiHoc_Id=${hsID}&strDangKy_LopHocPhan_Id=${lhpID}`
    return await LayDuLieu(link)
}
export async function LayLichHoc2({ hsID, lhpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_LichTuanTheoLopHocPhan/LayLichTuanTheoLopHocPhan?strQLSV_NguoiHoc_Id=${hsID}&strDangKy_LopHocPhan_Id=${lhpID}`
    return await LayDuLieu(link)
}
export async function LayLopThucHanh({ hsID, ngID, khID, hpID, nlID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strMaNhomLop=${nlID}&strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_HocPhan_Id=${hpID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link)
}

export async function LayLopHocPhanDangToChuc({ hsID, ngID, khID, hpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}&strDangKy_KeHoachDangKy_Id=${khID}&strDaoTao_HocPhan_Id=${hpID}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link);
}
export async function LayLichCaNhan({ hsID, ngayBD, ngayKT }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan?strQLSV_NguoiHoc_Id=${hsID}&strNgayBatDau=${typeof ngayBD == 'string' ? ngayBD : FormatDate(ngayBD)}&strNgayKetThuc=${typeof ngayKT == 'string' ? ngayKT : FormatDate(ngayKT)}&strNguoiThucHien_Id=${hsID}`
    return await LayDuLieu(link);
}

export async function LayDanhSachSinhVien({ lhpID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/nhansuapi/api/NS_ThongTinCanBo/LayDSDangKyHoc?strDaoTao_LopHocPhan_Id=${lhpID}`
    return await LayDuLieu(link)
}

export async function LayDanhSachHocPhan({ hsID, ngID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayKetQuaTichLuyTheoKhoi?strQLSV_NguoiHoc_Id=${hsID}&strDaoTao_ChuongTrinh_Id=${ngID}`
    return await LayDuLieu(link)
}
export async function LayDanhSachHocPhan2({ ngID }) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/kehoachchuongtrinhapi/api/KHCT_HocPhan_ChuongTrinh/LayDanhSach?strDaoTao_ChuongTrinh_Id=${ngID}&pageSize=10000000`
    return await LayDuLieu(link)
}