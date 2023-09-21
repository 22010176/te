import { LayDanhSachHocPhan2, LayDanhSachSinhVien, LayDuLieuHocSinh, LayLichCaNhan } from './getAPI_'

function GetAPIData(func, format) { return async function (param) { return format(await func(param), param) } }

// svID, maSV
const _SV = GetAPIData(LayDuLieuHocSinh, function (data, param) {
    const _data = data.Data
    return _data.find(obj => !param[1] || obj.QLSV_NGUOIHOC_MASO == param[1])
}) // obj data {}

const _LCN = GetAPIData(LayLichCaNhan, function (data, param) { return data.Data }) // []
const _DSSV = GetAPIData(LayDanhSachSinhVien, function (data, param) { return data.Data });
const _DSHP = GetAPIData(LayDanhSachHocPhan2, function (data, param) { return data.Data })

export { _SV, _LCN, _DSSV, _DSHP }