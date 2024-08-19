module Admin
  module Dashboard
    class CreateImageAction
      include Dry::Monads[:result]

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
          key.failure('Invalid file') unless File.file?(file)
        end

        rule(:car_id) do
          car = Car.find_by(id: value)
          if car.present?
            values[:car] = car
          else
            key.failure('Car not found by ID')
          end
        end
      end

      def call(input)
        case Contract.new.call(input).to_monad
        in Success(car:, file:)
          car.images.attach file
          if car.save
            Success(true)
          else
            Failure({ base: 'Error persisting car' })
          end
        in Failure(result)
          Failure(result.errors.to_h)
        end
      end
    end
  end
end
