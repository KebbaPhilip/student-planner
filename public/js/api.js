/* api.js */
/**
 * API Configuration & Methods
 * Handles all backend API calls
 */

const API_BASE_URL = "http://localhost:5000/api";

class StudySyncAPI {
  constructor() {
    this.token = localStorage.getItem("token") || null;
  }

  // Set Authorization Header
  getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
  }

  // Handle API Response
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }

    return data;
  }

  // ========================================
  // AUTHENTICATION ENDPOINTS
  // ========================================

  async register(name, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ name, email, password }),
      });

      const data = await this.handleResponse(response);
      this.token = data.token;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await this.handleResponse(response);
      this.token = data.token;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // ========================================
  // STUDY PLAN ENDPOINTS
  // ========================================

  async createStudyPlan(planData) {
    try {
      const response = await fetch(`${API_BASE_URL}/study-plans`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(planData),
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async getStudyPlans() {
    try {
      const response = await fetch(`${API_BASE_URL}/study-plans`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async getStudyPlanById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/study-plans/${id}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async updateStudyPlan(id, planData) {
    try {
      const response = await fetch(`${API_BASE_URL}/study-plans/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(planData),
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async deleteStudyPlan(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/study-plans/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async addTaskToStudyPlan(planId, taskTitle) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/study-plans/${planId}/tasks`,
        {
          method: "POST",
          headers: this.getHeaders(),
          body: JSON.stringify({ title: taskTitle }),
        },
      );

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(planId, taskId, completed) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/study-plans/${planId}/tasks/${taskId}`,
        {
          method: "PUT",
          headers: this.getHeaders(),
          body: JSON.stringify({ completed }),
        },
      );

      return await this.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
}

// Create global API instance
const api = new StudySyncAPI();
