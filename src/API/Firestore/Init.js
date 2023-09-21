import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, collection, arrayUnion, addDoc, getDoc, getDocs, where, query, updateDoc } from 'firebase/firestore'

// import { LayDuLieuHocSinh, LayDanhSachHocPhan2, } from '..'
import { v4 } from 'uuid';


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
} // first project
const con3 = {
    apiKey: "AIzaSyDn_5GB0SfqP9ioepNaSehLaFxZkI2m438",
    authDomain: "elated-emitter-363807.firebaseapp.com",
    databaseURL: "https://elated-emitter-363807-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "elated-emitter-363807",
    storageBucket: "elated-emitter-363807.appspot.com",
    messagingSenderId: "325642719623",
    appId: "1:325642719623:web:602a8cb09eb35d08b0c322",
    measurementId: "G-B3LQBP5BNN"
}// testing-project
const app = initializeApp(con2);
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



export { db };

// export { SinhVienDN, SinhVien, HocPhan, DanhSachLienKet, LichHoc }