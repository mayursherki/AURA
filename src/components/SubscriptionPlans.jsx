
import React, { useState } from "react";

function SubscriptionPlans({ selectedPlan, onSelectPlan }) {
    const plans = [
    {
      id: 1,
      name: "Weekly Plan",
      duration: "7 Days",
      description: "Start your wellness journey."
    },
    {
      id: 2,
      name: "Monthly Plan",
      duration: "30 Days",
      description: "Build a healthy daily routine."
    },
    {
      id: 3,
      name: "Quarterly Plan",
      duration: "90 Days",
      description: "Continue your wellness journey."
    }
  ];

  return (
    <div>
      <h3 className="student-section-title">
        🌸 Subscription Plans
      </h3>

      <p>Choose a plan for your wellness journey.</p>

      <div className="row g-4">
        {plans.map((plan) => (
          <div className="col-md-4" key={plan.id}>
            <div className="student-stat-card">
              <div className="student-card-icon">🌿</div>

              <h4>{plan.name}</h4>
              <h3>{plan.duration}</h3>

              <p>{plan.description}</p>

              <button
                className="btn btn-success"
                onClick={() => onSelectPlan(plan.name)}
                              >
                Choose Plan
              </button>

              {selectedPlan === plan.name && (
                <p className="text-success mt-3">
                  Plan Selected Successfully!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;
