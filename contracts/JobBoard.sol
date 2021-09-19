// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract JobBoard {

    /* State variables */

    struct JobPosting {
        uint id;
        address poster;
        string title;
        string description;
        address[] applicants;
        // TODO: add an expiry mechanism. block height maybe
    }

    struct JobSeeker {
        string linkedIn;
        // TODO: add more??
    }

    uint public jobCount;
    mapping(uint => JobPosting) public jobPostings;
    mapping(address => JobSeeker) public jobSeekers;


    /* Events */

    event PostJob(uint indexed id, address poster, string title);
    event RegisterJobSeeker(address indexed seeker);
    event Apply(address applicant, uint jobId);


    /* Public functions */

    constructor() public {}

    function postJob(string _title, string _description) public {
        jobPostings[jobCount] = JobPosting({
            id: jobCount,
            poster: msg.sender,
            title: _title,
            description: _description,
        });
        jobCount += 1;
        emit PostJob(newJob.id, msg.sender, _title);
    }
    
    function registerAsSeeker(string _linkedIn) {
        require(jobSeekers[msg.sender].linkedIn == "");
        require(_linkedIn != "");
        jobSeekers[msg.sender] = JobSeeker({
            linkedIn: _linkedIn
        });
        emit RegisterJobSeeker(msg.sender);
    }

    function apply(uint jobId) public {
        // TODO: require job posting hasn't expired
        require(jobPostings[jobId].poster != address(0));
        require(jobSeekers[msg.sender].linkedIn != "");

        // TODO: is there a better way to do this?
        JobPosting storage posting = jobPostings[jobId];
        for (uint i = 0; i < posting.applicants.length; i++) {
            assert(posting.applicants[i] != msg.sender);
        }

        jobPosting.applicants.push(jobSeekers[msg.sender]);
        emit Apply(msg.sender, jobId);
    }

}
