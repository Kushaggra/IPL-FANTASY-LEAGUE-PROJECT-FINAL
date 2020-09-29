package com.telstra.service;


import com.telstra.model.Admin;


public interface IAdminService {
	public int getAdminId(Admin obj);
	public Admin getAdminById(int ID);
}
