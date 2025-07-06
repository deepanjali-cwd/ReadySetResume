import { LightningElement, track } from 'lwc';
import saveResume from '@salesforce/apex/ResumeController.saveResume';

export default class ResumeForm extends LightningElement {
    @track fullName;
    @track email;
    @track phone;
    @track education;
    @track skills;
    @track projects;
    @track experience;
    @track certifications;

    @track selectedRole;
    @track showPreview = false;
    @track selectedTemplate = 'minimal';

     // New: Role to Skills mapping
     roleSkillMap = {
        'Salesforce Developer': 'Apex, LWC, SOQL, Triggers',
        'Web Developer': 'HTML, CSS, JavaScript, React',
        'Data Analyst': 'SQL, Excel, Power BI, Python',
        'Business Analyst': 'Stakeholder Management, Wireframing, Documentation',
        'Fresher': 'Problem Solving, Communication, Learning Ability'
    };

    // New: role dropdown change
    handleRoleChange(event) {
        this.selectedRole = event.detail.value;
        this.skills = this.roleSkillMap[this.selectedRole];
    }



    handleChange(event) {
        this[event.target.name] = event.target.value;
    }

    handleSave(){
        const resumeData = {
            fullName: this.fullName,
            email: this.email,
            phone_number: this.phone,
            education: this.education,
            skills: this.skills,
            projects: this.projects,
            experience: this.experience,
            certifications: this.certifications
        };
        saveResume({ resumeInput: resumeData })
        .then(() => {
            alert('Resume saved successfully');
            this.showPreview = false;
        })
        .catch(error => {
            console.error('Full error:', JSON.stringify(error)); // Log exact error to console
            alert('Error saving resume: ' + error.body.message);  // Show backend message to user
        });
    }

    get isMinimalTemplate() {
        return this.selectedTemplate === 'minimal';
    }
    
    get isSectionedTemplate() {
        return this.selectedTemplate === 'sectioned';
    }
    

    // New: roles to show in combobox
    get roleOptions() {
        return [
            { label: 'Salesforce Developer', value: 'Salesforce Developer' },
            { label: 'Web Developer', value: 'Web Developer' },
            { label: 'Data Analyst', value: 'Data Analyst' },
            { label: 'Business Analyst', value: 'Business Analyst' },
            { label: 'Fresher', value: 'Fresher' }
        ];
    }

    roleSkillMap = {
        'Salesforce Developer': 'Apex, LWC, SOQL, Triggers',
        'Web Developer': 'HTML, CSS, JavaScript, React',
        'Data Analyst': 'SQL, Excel, Power BI, Python',
        'Business Analyst': 'Stakeholder Management, Wireframing, Documentation',
        'Fresher': 'Problem Solving, Communication, Learning Ability'
    };


    handleTemplateChange(event) {
        this.selectedTemplate = event.detail.value;
    }

    get templateOptions() {
        return [
            { label: 'Minimal Layout', value: 'minimal' },
            { label: 'Sectioned Layout', value: 'sectioned' }
        ];
    }

    handlePreview(){
        
        this.showPreview  = true;
    }

    

}
