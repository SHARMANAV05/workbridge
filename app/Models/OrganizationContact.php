<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'org_id',
        'designation',
        'email',
        'contact_name',
        'is_primary',
        'is_active',
        'contact_num',
    ];
}
