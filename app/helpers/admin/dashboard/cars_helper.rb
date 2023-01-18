module Admin::Dashboard::CarsHelper
  def car_brands_for_select
    Car::AVAILABLE_CAR_BRANDS.map do |brand|
      [I18n.t("cars.brands.#{brand}"), brand.to_s]
    end
  end

  def car_engine_types_for_select
    Car::AVAILABLE_CAR_ENGINE_TYPES.map do |engine|
      [I18n.t("cars.engine_types.#{engine}"), engine.to_s]
    end
  end

  def car_body_configuration_types_for_select
    Car::AVAILABLE_CAR_BODY_CONF.map do |body|
      [I18n.t("cars.body_types.#{body}"), body.to_s]
    end
  end

  # param [Car] car
  def car_images_upload_input(car)
    react_component 'Common.Forms.ImagesInput', props: {
      previousImages: previous_images_for(car),
      objectName: 'car',
      fieldName: 'images',
      uploadUrl: admin_dashboard_car_images_path(car.id),
      uploadParam: 'file',
      refreshUrl: admin_dashboard_car_images_path(car.id)
    }
  end

  private

  # param [Car] car
  def previous_images_for(car)
    car.images.map do |attachment|
      { url: url_for(attachment), deletionUrl: admin_dashboard_car_image_path(car_id: car.id, id: attachment.id) }
    end
  end
end

