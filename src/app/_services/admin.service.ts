import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { User } from '../_models/index';
import { Content } from '../_models/index';
import { Reward } from '../_models/index';
import { Department } from '../_models/index';
import { Company } from '../_models/index';

import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  sendInvitationToUser(user) {
    return this.http.post('/send_invitation_to_user', JSON.stringify(user), this.options);
  }

  sendInvitationToCompany(company) {
    return this.http.post('/send_invitation_to_company', JSON.stringify(company), this.options);
  }

  sendEmailRegardingReward(user, reward, number) {
    let post_params = {user:user, reward: reward, number: number};
    console.log(post_params);
    return this.http.post('/send_email_regarding_reward', JSON.stringify(post_params), this.options);
  }

  //User Service
  getUsers() {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/users/${current_user._id}`).map(res => res.json());
  }
  getUser(user_id) {
    return this.http.get(`/specific_user/${user_id}`).map(res => res.json());
  }
  addUser(user: User) {
    user.date_joined =  Date.now();
    return this.http.post("/user", JSON.stringify(user), this.options);
  }
  send_password_reset_email(user: User) {
    return this.http.post('/send_password_reset_email', JSON.stringify(user), this.options);
  }
  editUser(user: User) {
    return this.http.put(`/user/${user._id}`, JSON.stringify(user), this.options);
  }
  deleteUser(user: User) {
    return this.http.delete(`/user/${user._id}`, this.options);
  }

  //Company Service
  getCompanies() {
    return this.http.get('/companies').map(res => res.json());
  }
  getCompany(company_id) {
    return this.http.get(`/specific_company/${company_id}`).map(res => res.json());
  }
  addCompany(company: Company) {
    company.date_joined =  Date.now();
    return this.http.post("/company", JSON.stringify(company), this.options);
  }
  editCompany(company: Company) {
    return this.http.put(`/company/${company._id}`, JSON.stringify(company), this.options);
  }
  deleteCompany(company: Company) {
    return this.http.delete(`/company/${company._id}`, this.options);
  }

  //Content Service
  getContents() {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/contents/${current_user._id}`).map(res => res.json());
  }
  getContent(content_id) {
    return this.http.get(`/content/${content_id}`).map(res => res.json());
  }
  addContent(content: Content) {
    return this.http.post("/content", JSON.stringify(content), this.options);
  }
  editContent(content: Content) {
    return this.http.put(`/content/${content._id}`, JSON.stringify(content), this.options);
  }
  deleteContent(content: Content) {
    return this.http.delete(`/content/${content._id}`, this.options);
  }

  //Quiz
  getQuizzes() {
    return this.http.get('/quizzes').map(res => res.json());
  }
  addQuiz(quiz) {
    return this.http.post("/quiz", JSON.stringify(quiz), this.options);
  }
  getQuiz(id) {
    return this.http.get("/quiz/${id}", this.options).map(res => res.json());
  }

  //Reward Service
  getRewards() {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/rewards/${current_user._id}`).map(res => res.json());
  }
  getAvailableRewards(department_v,department_id, department_name) {
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`/get_available_rewards/${current_user.company._id}/${department_v}/${department_id}/${department_name}`).map(res => res.json());
  }
  getReward(reward_id) {
    return this.http.get(`/reward/${reward_id}`).map(res => res.json());
  }
  addReward(reward) {
    return this.http.post("/reward", JSON.stringify(reward), this.options);
  }
  editReward(reward) {
    return this.http.put(`/reward/${reward._id}`, JSON.stringify(reward), this.options);
  }
  deleteReward(reward) {
    return this.http.delete(`/reward/${reward._id}`, this.options);
  }

  //Department
  getDepartments() {
    return this.http.get('/departments').map(res => res.json());
  }

  //get Log Ons
  getLogOns(company_id, department_id, user_id, date_from, date_end){
    return this.http.get(`/get_log_ons/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }

  //add task completed
  addTaskCompleted(task_completed) {
    return this.http.post(`/new_task_completed`, JSON.stringify(task_completed), this.options);
  }

  //Get Task Completd
  getTaskCompleted(company_id, department_id, user_id, date_from, date_end) {
    return this.http.get(`/get_task_completed/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }

  //add Points Awarded
  addPointsAwarded(points_awarded) {
    return this.http.post(`/new_points_awarded`, JSON.stringify(points_awarded), this.options);
  }

  //Get Task Completd
  getPointsAwarded(company_id, department_id, user_id, date_from, date_end) {
    return this.http.get(`/get_points_awarded/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }

 //add Reward Redemptions
  addRewardRedemptions(reward_redemptions) {
    return this.http.post(`/new_reward_redemptions`, JSON.stringify(reward_redemptions), this.options);
  }

 //update Reward Redemptions
  updateRewardRedemptions(reward_redemptions) {
    return this.http.put(`/update_reward_redemptions`, JSON.stringify(reward_redemptions), this.options);
  }

  //Get Reward Redemptions
  getRewardRedemptions(company_id, department_id, user_id, date_from, date_end) {
    return this.http.get(`/get_reward_redemptions/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }

  //Get Top Videos
  getTopVideos(company_id, department_id, user_id, date_from, date_end) {
    return this.http.get(`/get_top_videos/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get Top Quizzes
  getTopQuizzes(company_id, department_id, user_id, date_from, date_end) {
    return this.http.get(`/get_top_quizzes/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get Most Point Users
  getMostPointUsers(company_id, department_id, date_from, date_end) {
    return this.http.get(`/get_most_point_users/${company_id}/${department_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get Most Point Departments
  getMostPointDepartments(company_id, date_from, date_end) {
    return this.http.get(`/get_most_point_departments/${company_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get total tasks by users
  getTotalNumberOfTasksByUser(company_id, department_id, date_from, date_end) {
    return this.http.get(`/get_total_tasks_completed_by_users/${company_id}/${department_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get Average Point per assignment
  getAveragePointPerAssignment(company_id, department_id, date_from, date_end){
    return this.http.get(`/get_average_points_per_assignment/${company_id}/${department_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get Most Reward Redemptions
  getMostRewardRedemptions(company_id, department_id, user_id, date_from, date_end) {
    return this.http.get(`/get_most_reward_redemptions/${company_id}/${department_id}/${user_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  //Get Most Sent Point User
  getMostSentPointUser(company_id, department_id, date_from, date_end) {
    return this.http.get(`/get_most_sent_point_user/${company_id}/${department_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  getMostReceivedPointUser(company_id, department_id, date_from, date_end) {
    return this.http.get(`/get_most_received_point_user/${company_id}/${department_id}/${date_from}/${date_end}`).map(res => res.json());
  }
  getUsersForAnalytic(company_id, department_id, date_from, date_end) {
    return this.http.get(`/get_user_for_analytic/${company_id}/${department_id}/${date_from}/${date_end}`).map(res => res.json());
  }
   
}
