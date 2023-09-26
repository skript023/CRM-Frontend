export interface Access {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    suspend: boolean;
    system: boolean;
}

export interface Role {
    _id: string;
    level: number;
    name: string;
    access: Access;
}

export interface User {
    _id: string
    fullname: string;
    username: string;
    email: string;
    computer_name: string;
    hardware_id: string;
    image: string;
    remember_token: string;
    expired: string;
    role: Role;
}
