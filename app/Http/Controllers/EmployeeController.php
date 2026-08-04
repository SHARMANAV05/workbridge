<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
Use Exception;

//                                                When someone says "REST API" they just mean: 
                
//                                                Use GET to fetch data 
                
//                                                Use POST to create data 
                
//                                                Use PUT to update data 
                
//                                                Use DELETE to delete data 

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $employees = Employee::where('is_active', 1)->where('is_latest', 1)->get();
        return response()->json($employees);
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
        $validateData =  $request->validate([
            'first_name'            => ['required','string','max:50','regex:/^[A-Za-z\s\.\-]+$/'],
            'last_name'             => ['required','string','max:50','regex:/^[A-Za-z\s\.\-]+$/'],
            'gender'                => 'required|in:male,female,other',
            'dob'                   => 'required|date',
            'email'                 => 'required|max:100|unique:employees,email',
            'contact_number'        => 'required|string|digits:10',
            'skill_type'            => 'required|string', 
            'experience_years'      => 'required|integer|min:0',
            'country'               => 'required|string',
        ]);

        $validateData = array_map(function($v){ return is_string($v) ? trim($v) : $v;}, $validateData);

        try{
            $lastEmp = Employee::latest('id')->first();
            $newEmpId = $lastEmp ? $lastEmp->emp_id + 1 : 1;
            Employee::create([
                'emp_id'                    => $newEmpId ,  //auto insert on checking the latest id made 
                'first_name'                => $validateData['first_name'],
                'last_name'                 => $validateData['last_name'],
                'gender'                    => $validateData['gender'],
                'dob'                       => $validateData['dob'],
                'email'                     => $validateData['email'],
                'contact_number'            => $validateData['contact_number'],
                'skill_type'                => $validateData['skill_type'],
                'experience_years'          => $validateData['experience_years'],
                'country'                   => $validateData['country'],
            ]);
            
            return response()->json(['message' => 'User registered Successfully'], 201);

        }
        catch(Exception $e)
        {
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
        
        // return response()->json($request->method());
        if($request->method() === 'PATCH')
        {
            try{
                Employee::where('id', $id)->update(['is_active' => $request->is_active]);
                $name = Employee::where('id', $id)->first();
                return response()->json(['message' => 'Employee Deleted Successfully', 'name' => $name->first_name], 201);  
            }
            catch(Exception $e)
            {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        }
        elseif($request->method() === 'PUT')
        {
            try{
                    Employee::where('id', $id)->update([
                                                            'first_name' => $request->first_name,
                                                            'last_name' => $request->last_name,
                                                            'gender' => $request->gender,
                                                            'email' => $request->email,
                                                            'dob' => $request->dob,                                                            
                                                            'contact_number' => $request->contact_number,
                                                            'address' => $request->address,
                                                            'city' => $request->city,
                                                            'state' => $request->state,
                                                            'pincode' => $request->pincode,
                                                            'country' => $request->country,
                                                            'skill_type' => $request->skill_type,
                                                            'experience_years' => $request->experience_years,
                                                            'bank_account_no' => $request->bank_account_no,
                                                            'bank_name' => $request->bank_name,
                                                            'ifsc_code' => $request->ifsc_code,
                                                            'document_type' => $request->document_type,
                                                            'document_number' => $request->document_number,
                                                            'description' => $request->description,
                                                            'created_by' => $request->created_by,
                                                            'updated_by' => $id,
                                                            'is_active' => $request->is_active,
                                                            'is_latest' => $request->is_latest,
                                                        ]);
                $output = Employee::find($id);
                return response()->json(['message' => 'Employee Updated Sucessfully 🎉', 'Updated Value' => $output], 200);                                           
            }
            catch(Exception $e)
            {
                return response()->json(['message' => $e->getMessage()], 500);
            }
            

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
