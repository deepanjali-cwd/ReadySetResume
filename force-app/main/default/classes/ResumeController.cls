public with sharing class ResumeController {
   @AuraEnabled
    public static void saveResume(Map<String,String> resumeInput){
        try {
            //create new record
            Resume__c resume = new Resume__c();

            // filling fields with the values coming from lwc
            resume.Full_Name__c = resumeInput.get('fullName');
            resume.Email__c = resumeInput.get('email');
            resume.Phone_Number__c = resumeInput.get('phone_number');
            resume.Education__c = resumeInput.get('education');
            resume.Skills__c = resumeInput.get('skills');
            resume.Projects__c = resumeInput.get('projects');
            resume.Experience__c = resumeInput.get('experience');
            resume.Certifications__c = resumeInput.get('certifications');

            //save into database
            insert resume;

        } catch (Exception e) {
             throw new AuraHandledException('Ooopss' + e.getMessage());
            
        }
    }
}