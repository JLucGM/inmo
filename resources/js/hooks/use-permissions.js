import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props;
    const user = auth.user;

    const hasPermission = (permission) => {
        if (!user || !user.permissions) return false;
        return user.permissions.includes(permission);
    };

    const hasRole = (role) => {
        if (!user || !user.roles) return false;
        return user.roles.includes(role);
    };

    const can = (permission) => hasPermission(permission);

    return {
        can,
        hasRole,
        hasPermission,
        permissions: user?.permissions || [],
        roles: user?.roles || [],
    };
}
