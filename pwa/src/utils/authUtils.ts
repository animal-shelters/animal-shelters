export function logout() {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.replace("/");
    }
}