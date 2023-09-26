export interface Access 
{
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    suspend: boolean;
    system: boolean;
}

export interface Role 
{
    _id: string;
    level: number;
    name: string;
    access: Access;
}

export interface Asset
{
    _id: string
    user_id: string
    product_id: string
    payment: string
    license: string
    status: string
    expired: boolean
    expired_date: string
}

export interface Activity
{
    _id: string;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
}

export interface User 
{
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
    asset: Asset;
    activity: Activity;
    createdAt: Date;
}
