export const Headers = (tenant?: string, token?: string) => {
    let Header: Record<string, string> = {
        'accept': 'application/json',
        "Content-Type": "application/json",
    }
    if (tenant) {
        Header = {
            ...Header,
            tenant: tenant
        }
    }
    if (token) {
        Header = {
            ...Header,
            Authorization: `Bearer ${token}`,
        }
    }

    return Header;
}