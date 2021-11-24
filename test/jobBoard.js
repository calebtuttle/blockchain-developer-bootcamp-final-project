const JobBoard = artifacts.require("./JobBoard.sol");

contract("JobBoard", accounts => {
  it("...should create a job post with the title 'Developer'.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    await JobBoardInstance.postJob("Developer", "desc", { from: accounts[0] });
    const jobPost = await JobBoardInstance.getJob.call(1);
    assert.equal(jobPost.title, "Developer", "The job title is not 'Developer'");
  });

  it("...should apply to a job as the first applicant.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    await JobBoardInstance.applyToJob(1, "LinkedIn", { from: accounts[1] });
    const applicantAddresses = await JobBoardInstance.viewApplicantAddresses.call(1);
    assert.equal(applicantAddresses[0], accounts[1], "The applicant address is not correct");
  });

  it("...should apply to a job as the second applicant.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    await JobBoardInstance.applyToJob(1, "LinkedInURL", { from: accounts[2] });
    const applicantAddresses = await JobBoardInstance.viewApplicantAddresses.call(1);
    assert.equal(applicantAddresses[1], accounts[2], "The applicant address is not correct");
  });

  it("...should delete the job with jobId 1.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    const jobPost1 = await JobBoardInstance.getJob.call(1);
    await JobBoardInstance.removeJob(1);
    let success = false;
    try {
        const jobPost2 = await JobBoardInstance.getJob.call(1);

    } catch (error) {
        success = true;
    }
    assert.equal(jobPost1.title, "Developer", "The job title is not 'Developer'");
    assert.equal(success, true, "Trying to view the removed job posting should return an error");
  });

  it("...should create 3 jobs.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    await JobBoardInstance.postJob("Developer2", "desc", { from: accounts[0] });
    await JobBoardInstance.postJob("Developer3", "desc", { from: accounts[0] });
    await JobBoardInstance.postJob("Developer4", "desc", { from: accounts[0] });
    const jobPost2 = await JobBoardInstance.getJob.call(2);
    const jobPost3 = await JobBoardInstance.getJob.call(3);
    const jobPost4 = await JobBoardInstance.getJob.call(4);
    assert.equal(jobPost2.title, "Developer2", "The job title is not 'Developer2'");
    assert.equal(jobPost3.title, "Developer3", "The job title is not 'Developer3'");
    assert.equal(jobPost4.title, "Developer4", "The job title is not 'Developer4'");
  });
  
  it("...should try to remove all 3 jobs (as a non-owner) but fail.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    let success = false;
    try {
        await JobBoardInstance.removeAllJobs({ from: accounts[1] });
    } catch (error) {
        success = true;
    }
    assert.equal(success, true, "Non-owner address removed all jobs");
  });

  it("...should delete all 3 jobs.", async () => {
    const JobBoardInstance = await JobBoard.deployed();
    await JobBoardInstance.removeAllJobs({ from: accounts[0] });
    const jobCount = await JobBoardInstance.jobCount.call({ from: accounts[0] });
    let success = false;
    try {
        const jobPost2 = await JobBoardInstance.getJob.call(2);
    } catch (error) {
        success = true;
    }
    assert.equal(jobCount, 1, "jobCount is " + jobCount + " instead of 1");
    assert.equal(success, true, "Trying to view a removed job posting should return an error");
  });
});
