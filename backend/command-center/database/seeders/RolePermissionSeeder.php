<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;



class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            'user' => ['list', 'create', 'view', 'update', 'delete']
        ];


        foreach ($permissions as $key => $value) {
            foreach ($value as $key1) {
                Permission::create(['name' => "$key.$key1"]);
            }
        }

        $roles = [
            'admin' => Permission::all(),
            "human-resource" => ["user.view"]
        ];

        foreach ($roles as $role => $permissions) {
            $role = Role::create(['name' => $role]);
            $role->syncPermissions($permissions);
        }
    }
}