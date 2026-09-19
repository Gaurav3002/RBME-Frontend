
export function getAdmin() {
    try {
        return JSON.parse(
            sessionStorage.getItem("admin") || "{}"
        );
    } catch {
        return {};
    }
}

export function getPermissions() {
    const admin = getAdmin();

    return admin.permissions || [];
}

export function hasPermission(permission) {
     const permissions = getPermissions();
     console.log("========== PERMISSION DEBUG ==========");
    console.log("Checking permission:", permission);
    console.log("Stored permissions:", permissions);
    console.log("Permission type:", typeof permission);
    console.log("Stored permission types:",
        permissions.map(p => typeof p)
    );

    return getPermissions().includes(permission);
}

export function hasAnyPermission(permissions = []) {
    return permissions.some(permission =>
        hasPermission(permission)
    );
}

export function hasAllPermissions(permissions = []) {
    return permissions.every(permission =>
        hasPermission(permission)
    );
}
    
