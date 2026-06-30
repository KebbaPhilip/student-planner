// app. js
/**
 * StudySync - Main Application Logic
 * Handles UI interactions and view management
 */

class StudySyncApp {
  constructor() {
    this.currentPlanId = null;
    this.allPlans = [];
    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.checkAuthentication();
  }

  // ========================================
  // DOM CACHING
  // ========================================

  cacheDOM() {
    // Main containers
    this.appContainer = document.getElementById("appContainer");
    this.authPage = document.getElementById("authPage");
    this.dashboardPage = document.getElementById("dashboardPage");

    // Auth elements
    this.loginToggle = document.getElementById("loginToggle");
    this.registerToggle = document.getElementById("registerToggle");
    this.loginForm = document.getElementById("loginForm");
    this.registerForm = document.getElementById("registerForm");
    this.loginMessage = document.getElementById("loginMessage");
    this.registerMessage = document.getElementById("registerMessage");

    // Dashboard elements
    this.userName = document.getElementById("userName");
    this.logoutBtn = document.getElementById("logoutBtn");
    this.plansBtn = document.getElementById("plansBtn");
    this.createBtn = document.getElementById("createBtn");
    this.plansView = document.getElementById("plansView");
    this.plansMessage = document.getElementById("plansMessage");
    this.createView = document.getElementById("createView");
    this.detailView = document.getElementById("detailView");
    this.studyPlansContainer = document.getElementById("studyPlansContainer");
    this.filterStatus = document.getElementById("filterStatus");

    // Plan form elements
    this.planForm = document.getElementById("planForm");
    this.planTitle = document.getElementById("planTitle");
    this.planSubject = document.getElementById("planSubject");
    this.planDueDate = document.getElementById("planDueDate");
    this.planPriority = document.getElementById("planPriority");
    this.planDescription = document.getElementById("planDescription");
    this.submitPlanBtn = document.getElementById("submitPlanBtn");
    this.cancelPlanBtn = document.getElementById("cancelPlanBtn");
    this.planMessage = document.getElementById("planMessage");
    this.createTitle = document.getElementById("createTitle");

    // Detail view elements
    this.backBtn = document.getElementById("backBtn");
    this.editPlanBtn = document.getElementById("editPlanBtn");
    this.deletePlanBtn = document.getElementById("deletePlanBtn");
    this.detailTitle = document.getElementById("detailTitle");
    this.detailSubject = document.getElementById("detailSubject");
    this.detailDueDate = document.getElementById("detailDueDate");
    this.detailPriority = document.getElementById("detailPriority");
    this.detailDescription = document.getElementById("detailDescription");
    this.detailStatus = document.getElementById("detailStatus");
    this.detailMessage = document.getElementById("detailMessage");
    this.taskInput = document.getElementById("taskInput");
    this.addTaskBtn = document.getElementById("addTaskBtn");
    this.tasksList = document.getElementById("tasksList");
  }

  // ========================================
  // EVENT BINDING
  // ========================================

  bindEvents() {
    // Auth events
    this.loginToggle.addEventListener("click", () =>
      this.showAuthForm("login"),
    );
    this.registerToggle.addEventListener("click", () =>
      this.showAuthForm("register"),
    );
    this.loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    this.registerForm.addEventListener("submit", (e) => this.handleRegister(e));

    // Dashboard events
    this.logoutBtn.addEventListener("click", () => this.handleLogout());
    this.plansBtn.addEventListener("click", () => this.showView("plans"));
    this.createBtn.addEventListener("click", () => this.showCreateView());
    this.filterStatus.addEventListener("change", () => this.filterPlans());

    // Plan form events
    this.planForm.addEventListener("submit", (e) => this.handleCreatePlan(e));
    this.cancelPlanBtn.addEventListener("click", () => this.showView("plans"));

    // Detail view events
    this.backBtn.addEventListener("click", () => this.showView("plans"));
    this.editPlanBtn.addEventListener("click", () => this.showEditView());
    this.deletePlanBtn.addEventListener("click", () => this.handleDeletePlan());
    this.addTaskBtn.addEventListener("click", () => this.handleAddTask());
    this.detailStatus.addEventListener("change", () =>
      this.handleStatusChange(),
    );
    this.taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleAddTask();
    });
  }

  // ========================================
  // AUTHENTICATION
  // ========================================

  checkAuthentication() {
    const token = localStorage.getItem("token");

    if (token) {
      this.showDashboard();
    } else {
      this.showAuthPage();
    }
  }

  showAuthForm(type) {
    if (type === "login") {
      this.loginToggle.classList.add("active");
      this.registerToggle.classList.remove("active");
      this.loginForm.classList.add("active");
      this.registerForm.classList.remove("active");
    } else {
      this.registerToggle.classList.add("active");
      this.loginToggle.classList.remove("active");
      this.registerForm.classList.add("active");
      this.loginForm.classList.remove("active");
    }
  }

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      this.showMessage(this.loginMessage, "Logging in...", "");
      await api.login(email, password);
      this.showDashboard();
      this.clearAuthForms();
    } catch (error) {
      this.showMessage(this.loginMessage, error.message, "error");
    }
  }

  async handleRegister(e) {
    e.preventDefault();

    const username = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      this.showMessage(this.registerMessage, "Creating account...", "");
      await api.register(username, email, password);
      this.showDashboard();
      this.clearAuthForms();
    } catch (error) {
      this.showMessage(this.registerMessage, error.message, "error");
    }
  }

  handleLogout() {
    api.logout();
    this.showAuthPage();
    this.clearAuthForms();
  }

  // ========================================
  // VIEW MANAGEMENT
  // ========================================

  showAuthPage() {
    this.authPage.style.display = "flex";
    this.dashboardPage.style.display = "none";
  }

  async showDashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    this.userName.textContent = user.username || "User";

    this.authPage.style.display = "none";
    this.dashboardPage.style.display = "flex";

    this.showView("plans");
    await this.loadStudyPlans();
  }

  showView(viewName) {
    // Update sidebar buttons
    this.plansBtn.classList.remove("active");
    this.createBtn.classList.remove("active");

    if (viewName === "plans") {
      this.plansBtn.classList.add("active");
    } else if (viewName === "create") {
      this.createBtn.classList.add("active");
    }

    // Hide all views
    this.plansView.classList.remove("active");
    this.createView.classList.remove("active");
    this.detailView.classList.remove("active");

    // Show selected view
    if (viewName === "plans") {
      this.plansView.classList.add("active");
    } else if (viewName === "create") {
      this.createView.classList.add("active");
    } else if (viewName === "detail") {
      this.detailView.classList.add("active");
    }
  }

  showCreateView() {
    this.currentPlanData = null;
    this.resetPlanForm();
    this.createTitle.textContent = "Create New Study Plan";
    this.submitPlanBtn.textContent = "Create Plan";
    this.currentPlanId = null;
    this.showView("create");
  }

  populatePlanForm(plan) {
    this.planTitle.value = plan.title || "";
    this.planSubject.value = plan.subject || "";
    this.planDueDate.value = new Date(plan.dueDate).toISOString().split("T")[0];
    this.planPriority.value = plan.priority || "medium";
    this.planDescription.value = plan.description || "";
  }

  showEditView() {
    this.createTitle.textContent = "Edit Study Plan";
    this.submitPlanBtn.textContent = "Update Plan";
    if (this.currentPlanData) {
      this.populatePlanForm(this.currentPlanData);
    }
    this.showView("create");
  }

  // ========================================
  // STUDY PLANS
  // ========================================

  async loadStudyPlans() {
    try {
      const data = await api.getStudyPlans();
      this.allPlans = data.studyPlans || [];
      if (this.plansMessage) {
        this.plansMessage.textContent = "";
        this.plansMessage.className = "form-message";
      }
      this.renderStudyPlans(this.allPlans);
    } catch (error) {
      if (this.plansMessage) {
        this.showMessage(
          this.plansMessage,
          `Error loading plans: ${error.message}`,
          "error",
        );
      }
    }
  }

  renderStudyPlans(plans) {
    if (plans.length === 0) {
      this.studyPlansContainer.innerHTML =
        '<p class="empty-state">No study plans yet. Create one to get started!</p>';
      return;
    }

    this.studyPlansContainer.innerHTML = plans
      .map((plan) => this.createPlanCard(plan))
      .join("");

    // Add event listeners to cards
    document.querySelectorAll(".study-plan-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest(".plan-card-actions")) {
          this.showPlanDetail(card.dataset.planId);
        }
      });
    });
  }

  createPlanCard(plan) {
    const dueDate = new Date(plan.dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `
            <div class="study-plan-card" data-plan-id="${plan._id}">
                <div class="plan-card-header">
                    <h3 class="plan-card-title">${this.escapeHtml(plan.title)}</h3>
                    <span class="priority-badge ${plan.priority}">${plan.priority}</span>
                </div>
                <p class="plan-card-subject">${this.escapeHtml(plan.subject)}</p>
                <div class="plan-card-info">
                    <span class="plan-card-date">📅 ${dueDate}</span>
                    <span class="status-badge ${plan.status}">${plan.status}</span>
                </div>
            </div>
        `;
  }

  filterPlans() {
    const status = this.filterStatus.value;

    if (!status) {
      this.renderStudyPlans(this.allPlans);
    } else {
      const filtered = this.allPlans.filter((plan) => plan.status === status);
      this.renderStudyPlans(filtered);
    }
  }

  async handleCreatePlan(e) {
    e.preventDefault();

    const planData = {
      title: this.planTitle.value,
      subject: this.planSubject.value,
      dueDate: this.planDueDate.value,
      priority: this.planPriority.value,
      description: this.planDescription.value,
    };

    try {
      if (this.currentPlanId) {
        // Update existing plan
        await api.updateStudyPlan(this.currentPlanId, planData);
        this.showMessage(
          this.planMessage,
          "Study plan updated successfully!",
          "success",
        );
      } else {
        // Create new plan
        await api.createStudyPlan(planData);
        this.showMessage(
          this.planMessage,
          "Study plan created successfully!",
          "success",
        );
      }

      setTimeout(() => {
        this.loadStudyPlans();
        this.showView("plans");
      }, 500);
    } catch (error) {
      this.showMessage(this.planMessage, error.message, "error");
    }
  }

  async showPlanDetail(planId) {
    try {
      const data = await api.getStudyPlanById(planId);
      const plan = data.studyPlan;

      this.currentPlanId = planId;
      this.currentPlanData = plan;

      // Populate detail view
      this.detailTitle.textContent = plan.title;
      this.detailSubject.textContent = plan.subject;
      this.detailPriority.className = `info-value priority-badge ${plan.priority}`;
      this.detailPriority.textContent = plan.priority;
      this.detailDescription.textContent =
        plan.description || "No description provided";
      this.detailStatus.value = plan.status;

      const dueDate = new Date(plan.dueDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      this.detailDueDate.textContent = dueDate;

      // Render tasks
      this.renderTasks(plan.tasks || []);

      this.showView("detail");
    } catch (error) {
      this.showMessage(this.detailMessage, error.message, "error");
    }
  }

  renderTasks(tasks) {
    if (tasks.length === 0) {
      this.tasksList.innerHTML = "<p class='empty-state'>No tasks yet.</p>";
      return;
    }

    this.tasksList.innerHTML = tasks
      .map(
        (task) => `
            <li class="task-item ${task.completed ? "completed" : ""}">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                    data-task-id="${task._id}"
                />
                <span class="task-text">${this.escapeHtml(task.title)}</span>
                <button class="task-delete-btn" data-task-id="${task._id}">✕</button>
            </li>
        `,
      )
      .join("");

    // Add event listeners
    document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        this.handleTaskUpdate(e.target.dataset.taskId, e.target.checked);
      });
    });

    document.querySelectorAll(".task-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        alert(
          "Delete functionality requires task ID implementation in backend",
        );
      });
    });
  }

  async handleAddTask() {
    const taskTitle = this.taskInput.value.trim();

    if (!taskTitle) {
      alert("Please enter a task title");
      return;
    }

    try {
      await api.addTaskToStudyPlan(this.currentPlanId, taskTitle);
      this.taskInput.value = "";
      await this.showPlanDetail(this.currentPlanId);
    } catch (error) {
      this.showMessage(this.detailMessage, error.message, "error");
    }
  }

  async handleTaskUpdate(taskId, completed) {
    try {
      await api.updateTask(this.currentPlanId, taskId, completed);
      await this.showPlanDetail(this.currentPlanId);
    } catch (error) {
      this.showMessage(this.detailMessage, error.message, "error");
    }
  }

  async handleStatusChange() {
    const status = this.detailStatus.value;

    try {
      await api.updateStudyPlan(this.currentPlanId, { status });
      this.showMessage(this.detailMessage, "Status updated!", "success");
      setTimeout(() => this.showPlanDetail(this.currentPlanId), 500);
    } catch (error) {
      this.showMessage(this.detailMessage, error.message, "error");
    }
  }

  async handleDeletePlan() {
    if (!confirm("Are you sure you want to delete this plan?")) {
      return;
    }

    try {
      await api.deleteStudyPlan(this.currentPlanId);
      this.showMessage(
        this.detailMessage,
        "Plan deleted successfully!",
        "success",
      );
      setTimeout(() => {
        this.loadStudyPlans();
        this.showView("plans");
      }, 500);
    } catch (error) {
      this.showMessage(this.detailMessage, error.message, "error");
    }
  }

  // ========================================
  // UTILITIES
  // ========================================

  showMessage(element, message, type) {
    element.textContent = message;
    element.className = "form-message";
    if (type) {
      element.classList.add(type);
    }
  }

  clearAuthForms() {
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    this.loginMessage.textContent = "";
    this.registerMessage.textContent = "";
  }

  resetPlanForm() {
    this.planForm.reset();
    this.planMessage.textContent = "";
    const today = new Date().toISOString().split("T")[0];
    this.planDueDate.value = today;
  }

  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new StudySyncApp();
});
