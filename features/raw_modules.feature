Feature: Raw modules
  As a user
  I want to view raw modules without templates or extraneous information
  So they can be more easily reused and can have there output saved and .png

  Scenario: Realtime module 
    When I go to /performance/licensing/realtime?view=raw
    Then I should see the "realtime" module for "licensing" data
    And I should not see other information for the "licensing" "realtime" module
