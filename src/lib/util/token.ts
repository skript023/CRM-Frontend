export function tokenExist()
{
    const token = document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/)

    return token?.toString() ? true : false
}