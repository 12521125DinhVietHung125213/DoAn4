const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Export router
const danhmuckhoaRoutes = require('./routes/danhmuckhoaRoute');
const nhanvienRoutes = require('./routes/bacsiRoute');
const khachhangRoutes = require('./routes/benhnhanRoute');
const khohangRoutes = require('./routes/khohangRoute');
const hoadonlichkhamRoutes = require('./routes/hoadonlichkhamRoute');
const hdnRoutes = require('./routes/hoadonnhapRoute');
const chitietlichkhamRoutes = require('./routes/chitietlichkhamRoutes');
const taikhoanRoutes = require('./routes/taikhoanRoute');
const datdichvukhamRoutes = require('./routes/datdichvukhamRoute');
const datlichkhambenhRoutes = require('./routes/datlichkhamRoute');
const hosobenhanRoutes = require('./routes/hosobenhnhanRoute');
const goidichvukhamRoutes = require('./routes/goidichvukhambenhRoute');
const thuocVTRoutes = require('./routes/thuocvattuRoute');
const trinhdoBSRoutes = require('./routes/trinhdobacsiRoute');
const phongkhamRoutes =require('./routes/phongkhamRoute');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng route
app.use(danhmuckhoaRoutes);
app.use(nhanvienRoutes);
app.use(khachhangRoutes);
app.use(khohangRoutes);
app.use(goidichvukhamRoutes);
app.use(hosobenhanRoutes)
app.use(hoadonlichkhamRoutes);
app.use(hdnRoutes);
app.use(chitietlichkhamRoutes);
app.use(taikhoanRoutes);
app.use(datdichvukhamRoutes);
app.use(datlichkhambenhRoutes);
app.use(thuocVTRoutes);
app.use(trinhdoBSRoutes);
app.use(phongkhamRoutes);



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
