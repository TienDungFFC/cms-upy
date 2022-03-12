<template>
    <div class="login_area" :style="`background-image: url(${$urlImage('/images/Screen.png')});`">
        <div class="container login_ctrl shadow-lg">
            <div class="row align-items-center login">
                <div class="col-4 login-item">
                    <div class="inner_avatar">
                        <img :src="$getUrlImage('images/login.png')" alt="#">
                    </div>
                </div>
                <div class="col-8 login-item">
                    <div class="inner_login">
                        <h2>Đăng nhập tài khoản</h2>
                        <form>
                            <div class="form-group">
                                <input type="text" 
                                    placeholder="Tên đăng nhập"
                                    v-model="phone"
                                    class="form-control"
                                    :class="{'is-invalid' : errors.username }"
                                    @keyup.enter="login"
                                    required>
                                <form-invalid :error="errors.username"/>                    
                            </div>

                            <div class="form-group">
                                <input-password 
                                    v-model="password"
                                    placeholder="Mật khẩu"
                                    :class="{'is-invalid' : errors.password }"/>
                                <form-invalid :error="errors.password"/>
                            </div>
                            <button class="btn w-50" @click="login">Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { saveToken } from '@/config/functions';
import { login } from '@/repositories/profile';
export default {
    data() {
        return {
            phone: '',
            password: '',
            errors: {},
        }
    },
    watch: {
        phone(val) {
            this.phone = val.replaceAll(' ', '');
        }
    },
    created() {

    },
    methods: {
        login(event) {
            this.errors = {};
            event.preventDefault()
            login({
                username: this.phone,
                password: this.password,
            }).then(res => {
                let data = res.data;
                if (data.success === API_STATUS_FAILED) {
                    this.$showMessage(data.message, 'error');
                } else {
                    let token = data.token;
                    saveToken(this.$getEnv('VUE_APP_KEY_ACCESS_TOKEN'), token.access_token);
                    saveToken(this.$getEnv('VUE_APP_KEY_REFRESH_TOKEN'), token.refresh_token);
                    axios.defaults.headers.common['Authorization'] = token.access_token.token;
                    this.$showMessage(data.message);
                    this.actionAfterLogin();
                }
            }).catch(err => {
                if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                    this.errors = err.data.data.data; 
                }
            })
        },
        actionAfterLogin() {
            let redirect = this.$route.query?.redirect;
            if (redirect) {
                redirect = atob(redirect);
                window.location.href = redirect;
            } else {
                window.location.href = process.env.VUE_APP_BASE_URL
            }
        }
    },
}
</script>
<style lang="scss">
.login_area {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4776E6;
    // background-image: linear-gradient(to left, rgba(37, 92, 253, 0.85), rgba(59, 70, 236, 0.85), rgba(87, 64, 202, 0.85), rgba(108, 60, 187, 0.85), rgba(115, 0, 189, 0.85));

    .login_ctrl {
        width: 40%;
        background: #fff;
        padding: 50px;
        border-radius: 10px;

        .inner_avatar {
            width: 250px;
            height: 250px;
            overflow: hidden;
            margin: 0 auto;
            img {
                max-width: 100%;
            }
        }

        .inner_login {
            width: 70%;
            float: right;
            text-align: center;

            h2 {
                font-size: 25px;
                text-transform: capitalize;
                margin-bottom: 40px;
                font-weight: 600;
            }

            input {
                display: block;
                height: 45px;
                line-height: 45px;
                width: 100%;
                border-radius: 8px;
            }

            button {
                display: block;
                height: 45px;
                border-radius: 50px;
                width: 50%;
                text-transform: capitalize;
                font-size: 14px;
                margin: 0 auto;
                font-weight: 600;
                background: #f69235;
                color: #fff;
                border-radius: 8px;
            }
        }
        .invalid-feedback {
            text-align: left;
        }
    }
}
@media screen and (max-width: 1919px) {
    .login_area {
        .login_ctrl {
            .inner_login {
                width: auto;
            }
        }
    }
}

@media screen and (max-width: 1439px) {
    .login_area {
        .login_ctrl {
            width: 50%;
        }
    }
}

@media screen and (max-width: 1099px) {
    .login_area {
        .login_ctrl {
            width: 60%;
        }
    }
}

@media screen and (max-width: 899px) {
    .login_area {
        .login_ctrl {
            width: 80%;
        }
    }
}


@media screen and (max-width: 767px) {
    .login_area {
        .container {
            margin: 0;
            max-width: unset;
        }
        .login_ctrl {
            width: 100%;
            height: 100%;
            border-radius: unset;
            padding-left: 0;
            padding-right: 0;
            .login {
                margin: 0;
                flex-direction: column;
                .login-item {
                    max-width: 100%;
                }
                .inner_login {
                    width: 100%;
                    padding-top: 50px;
                }
            }
        }
    }
}

@media screen and (max-width: 374px) { 
    .login_area {
        .login_ctrl {
            .login {
                .inner_avatar {
                    width: 200px;
                    height: 200px;
                }
                .inner_login {
                    padding-top: 30px;
                }
            }
        }
    }
}
</style>
