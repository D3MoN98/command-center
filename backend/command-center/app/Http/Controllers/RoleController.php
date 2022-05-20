<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Permission;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:role.list')->only('index');
        $this->middleware('permission:role.create')->only('create');
        $this->middleware('permission:role.view')->only('view');
        $this->middleware('permission:role.edit')->only('edit');
        $this->middleware('permission:role.delete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RoleResource::collection(Role::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new RoleResource(Role::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $role = Role::find($id);

            $role->update($request->all());

            return response()->json(['status' => 'success', 'message' => 'Role updated successfully', 'data' => new RoleResource($role->refresh())]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function setPermission(Request $request, $id)
    {
        try {
            $role = Role::find($id);
            $permission = Permission::find($request->permission_id);

            if ($request->checked) {
                $role->givePermissionTo($permission);
            } else {
                $role->revokePermissionTo($permission);
            }

            return ['status' => 'success', 'message' => 'Permission status changed', 'data' =>  $role->refresh()];
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}