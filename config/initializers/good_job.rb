Rails.application.configure do
  config.good_job.retry_on_unhandled_error = true
  config.good_job.execution_mode = :async
end