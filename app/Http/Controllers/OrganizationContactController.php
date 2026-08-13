<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\OrganizationContact;
use Exception;

class OrganizationContactController extends Controller
{

    public function generateContactCode(){
        $code = 'CONTR'.DATE('Ym').'-01';
        return $code;

        $sql = DB::select();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {        

        $validateData = $request->validate([
            'activeStatus' => 'required',
            'primaryStatus' => 'required',
            'organizationId' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'contactNum' => 'required',
            'emailCont' => 'required',
            'designation' => 'nullable',
        ]);

        $validateData = array_map(function($v){ return is_string($v) ? trim($v) : $v ;}, $validateData);

        // return response()->json(['message' => 'Before Try-Catch', $validateData]);
        try{
            OrganizationContact::create([
                'org_id'        => $validateData['organizationId'],
                'designation'   => $validateData['designation'],
                'email'         => $validateData['emailCont'],
                'contact_name'  => $validateData['first_name'].' '.$validateData['last_name'],
                'is_primary'    => $validateData['primaryStatus'],
                'is_active'     => $validateData['activeStatus'],
                'contact_num'   => $validateData['contactNum'],

            ]);            
            return response()->json([$validateData, 'message' => "New Contact Added 📲"], 201);
        }
        catch(Exception $e){
            // return response()->json(['message' => 'Something Went Again Try Again ❌'], 500);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        //
    }
}
