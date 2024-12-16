import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Kiểm tra định dạng email
    if (!username.endsWith('@gmail.com')) {
      setMessage('Tên đăng nhập phải có dạng @gmail.com');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: username,
        mat_khau: password,
      });

      // Kiểm tra xem phản hồi có chứa thông tin người dùng không
      if (response.data && response.data.user) {
        const user = response.data.user;
        
        // Lưu thông tin người dùng nếu cần thiết và điều hướng
        localStorage.setItem('token', response.data.token);  // Thay đổi này nếu có token
        toast.dismiss();
        toast.success(`Xin chào, ${user.ten_nguoi_dung}!`);
        navigate('/');
      } else {
        setMessage('Thông tin tài khoản hoặc mật khẩu không chính xác!');
        toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Có lỗi xảy ra trong quá trình đăng nhập.');
      toast.error('Có lỗi xảy ra trong quá trình đăng nhập.');
    }
  };

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">ĐA KHOA PHỐ NỐI</h4>
                    </div>

                    <form onSubmit={handleLogin}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Email/SĐT
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Mật Khẩu
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary1 btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Đăng Nhập
                        </button>
                        {message && <p className="text-danger">{message}</p>}
                        <a className="text-muted" href="#!">
                          Bạn quên mật khẩu?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Bạn chưa có tài khoản?</p>
                        <button type="button" className="btn btn-outline-danger">
                          Đăng ký
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
