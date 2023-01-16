class JsonbSerializers
  SerializeError = Class.new(StandardError)
  DumpError = Class.new(SerializeError)
  LoadError = Class.new(SerializeError)

  def self.dump(value)
    return if value.nil?

    case value
    when Array, Hash then JSON.dump(value)
    when String then value
    when NilClass then nil
    end
  end

  def self.load(value)
    return if value.nil?

    if value.is_a?(String)
      JSON.parse(value, symbolize_names: true)
    else
      value
    end
  rescue JSON::ParserError
    value
  end
end
