module Admin
  module Dashboard
    class CreateImageAction
      include Dry::Monads[:result, :try]

      class << self
        delegate :call, to: :new
      end

      class Contract < Dry::Validation::Contract
        params do
          required(:car_id).filled(:integer)
          required(:file).filled(:any)
        end

        rule(:file) do
          file = value
          key.failure("Invalid file") unless File.file?(file)
        end

        rule(:car_id) do
          car = Car.find_by(id: value)
          if car.present?
            values[:car] = car
          else
            key.failure("Car not found by ID")
          end
        end
      end

      def call(input)
        case Contract.new.call(input).to_monad
        in Success[car:, file:]
          Try do
            car.images.attach file
            car.save!
          end.to_result
        in Failure[result]
          Failure(result)
        end
      end
    end
  end
end
