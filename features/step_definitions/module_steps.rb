def values
  {
    'realtime' => {
      'licensing' => {
        extra_info: 'Real-time usage',
        raw: 11
      }
    }
  }
end

Then(/^I should see the "(.*?)" module for "(.*?)" data$/) do |display_module, service|
  page.find("##{service}-#{display_module} strong").should have_content(values[display_module][service][:raw])
end

Then(/^I should not see other information for the "(.*?)" "(.*?)" module$/) do |service, display_module|
  page.find("##{service}-#{display_module} strong").should_not have_content(values[display_module][service][:extra_info])
end

Then(/^I should see the other information for the "(.*?)" realtime module$/) do |service, display_module|
  page.find("##{service}-#{display_module} strong").should have_content(values[display_module][service][:extra_info])
end
