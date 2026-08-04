<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Exception;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $organization = Organization::where('is_active', 1)->where('is_latest', 1)->get();
        return response()->json($organization);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // return response()->json($request->all());

        $validateData = $request->validate([

                'organizationName'    => ['required','string','max:50','regex:/^[A-Za-z\s\.\-]+$/'], 
                'industryType'        => 'required|string|min:2|max:100',                              
                'establishedDate'     => 'required|date',                         
                'GSTNo'               => 'required|string|size:15|unique:organizations,gst_number', 
                'countryName'         => 'required|string|min:4|max:50',             
                'address'             => 'required|string|min:5',                
                'cityName'            => 'required|string|min:2',        
                'stateName'           => 'required|string|min:2',       
        ]);


        $validateData = array_map(function($v){return is_string($v) ? trim($v) : $v ;}, $validateData);

        try{
            $lastOrg = Organization::latest('id')->first();
            $newOrgId = $lastOrg ? $lastOrg->org_id + 1 : 1;
            Organization::create([
                'org_id'           => $newOrgId,
                'name'             => $validateData['organizationName'],
                'industry_type'    => $validateData['industryType'],
                'established_at'   => $validateData['establishedDate'],    
                'gst_number'       => $validateData['GSTNo'],                                 
                'country'          => $validateData['countryName'],                              
                'address'          => $validateData['address'],        
                'city'             => $validateData['cityName'],            
                'state'            => $validateData['stateName'],            
            ]);
            
            return response()->json(['message' => 'Organization Created Successfully'], 201);
        }
        catch(Exception $e){
            return response()->json(['message' => 'Something went wrong. Please try again ❌'], 500);
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
        // return response()->json($request->is_active);
        try{
            Organization::where('id', $id)->update(['is_active' => $request->is_active]);
            return response()->json(['message' => 'Organization Deleted Successfully'], 201);

        }
        catch(Exception $e)
        {
            return response()->json(['message' => 'Unable to Delete, Try Again !'], 500);
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
}
