import './ProvidersEmptyState.css'

type ProvidersEmptyStateProps = {
  message: string
}

const ProvidersEmptyState = ({ message }: ProvidersEmptyStateProps) => (
  <div className="providers__empty">{message}</div>
)

export default ProvidersEmptyState
