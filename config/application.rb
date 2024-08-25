require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RentACarV2
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Check if we use Docker to allow docker ip through web-console
    if File.file?("/.dockerenv") == true
      host_ip = `/sbin/ip route|awk '/default/ { print $3 }'`.strip
      config.web_console.whitelisted_ips = [host_ip]
    end

    config.exceptions_app = routes

    config.active_job.queue_adapter = :good_job

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.i18n.load_path +=
      Dir[Rails.root.join("config", "locales", "*.{yml}")]
  end
end
