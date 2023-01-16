class Account < ApplicationRecord
  include Rodauth::Rails.model
  enum :status, unverified: 1, verified: 2, closed: 3
end

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  email         :string           not null
#  kind          :string           default("main"), not null
#  password_hash :string
#  status        :integer          default("unverified"), not null
#
# Indexes
#
#  index_accounts_on_email  (email) UNIQUE WHERE (status = ANY (ARRAY[1, 2]))
#
